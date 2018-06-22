import './alien.less';
import {
  readStoriesSkin,
  readStoriesSkinContent,
  saveStoriesSkinContent,
  readParamsSkinContent,
  saveParamsSkinContent
} from './skin';
const urlJoin = require('url-join');

class AlienInsideTwoday {

  constructor() {
    this.defaults = {
      targetUrl: 'https://die-netzialisten.de',
      rssFeedUrl: 'feed',
      titleField: 'title',
      publishedField: 'pubDate',
      commentsField: 'comments',
      multiParts: ['commentUrl', 'comments'], // 0: alpha, 1: number
      pauseChecks: 1000 * 60 * 2, // pause 2 min in between checks
      syncStories: 3,
      colorAlias: '#13c4a5',
      colorNavIcon: '#13c4a5',
      forceHttp: false,
      positionToast: 'toast-top-full-width',
      menuOffsetTop: 0,
      menuOffsetRight: 0,
      debug: false
    };
  }

  checkNewVersionAvailability() {
    let self = this;

    $.getJSON('https://rawgit.com/NeonWilderness/tdalien/master/package.json', function (pkg) {
      let thisVersion = self.parseVersion(document.body.dataset.version);
      if (self.parseVersion(pkg.version) > thisVersion) {
        $('#btnClose, #btnCancel').on('click', function (e) {
          e.preventDefault();
          $('#newVersion').fadeOut();
        });
        $('#btnUpdate').on('click', function (e) {
          e.preventDefault();
          $('#msgNewVersion').fadeOut();
          $('#msgUpdate').fadeIn().css('display', 'inline-block');
        });
        $('#btnSaveParams').on('click', function (e) {
          e.preventDefault();
          self.saveCurrentParams();
        });
        $('#newVersion').fadeIn(900);
      }
    });
  }

  getNewBlogAlias() {
    let alias = this.options.targetUrl.replace('www.', '').match(/https?:\/\/(.*?)\./i);
    return (alias ? alias[1] : '');
  }

  implant(options) {

    this.options = Object.assign({}, this.defaults, options);
    this.options.newBlogAlias = this.getNewBlogAlias();

    if (this.options.debug) console.log(`Alien Options: ${JSON.stringify(this.options, null, 2)}`);

    if (this.options.forceHttp && location.protocol === 'https:')
      location.protocol = 'http:';

    this.options.colorAlias = this.options.colorAlias.toLowerCase();
    if (this.options.colorAlias !== this.defaults.colorAlias)
      $('#alias').css('color', this.options.colorAlias);

    let navIcon = $('#showMenu');
    this.options.colorNavIcon = this.options.colorNavIcon.toLowerCase();
    if (this.options.colorNavIcon !== this.defaults.colorNavIcon)
      navIcon.css('color', this.options.colorNavIcon);
    if (!!this.options.menuOffsetTop)
      navIcon.css('top', 8 + this.options.menuOffsetTop);
    if (!!this.options.menuOffsetRight)
      navIcon.css('right', 25 + this.options.menuOffsetRight);

    $('.alien').each((index, el) => {
      switch (el.tagName) {
        case 'A':
          el.href = this.options.targetUrl;
          if (this.options.newBlogAlias.length)
            el.innerHTML = el.innerHTML.replace('<% site.alias %>', this.options.newBlogAlias);
          break;
        case 'IFRAME':
          el.src = this.options.targetUrl;
      }
    });

    toastr.options = {
      closeButton: false,
      newestOnTop: false,
      positionClass: this.options.positionToast,
      progressBar: true,
      timeOut: '8000'
    };

    this.initClickFunctions();

    setTimeout(() => {
      if (this.isUserAdministrator()) {

        this.checkNewVersionAvailability();

        this.restoreSavedParams();

        let $menuParams = $('#menuParams');
        if (this.options.targetUrl === this.defaults.targetUrl) {
          $menuParams.addClass('highlight');
          toastr.warning('<div style="text-align:center">Bitte klicken Sie im Menü auf <b>Parameter/Einstellungen</b>, um <b>Ihren eigenen Blog</b> zu aktivieren!</div>');
        }
        else {
          $menuParams.removeClass('highlight');
          if (this.maySyncNow()) this.readAlienRSS();
        }
      }
    }, 2000);

  }

  initClickFunctions() {

    let isOpen = false;
    let navIcon = $('#showMenu');
    let icon = navIcon.find('i');
    let toggleSidebar = () => {
      if (isOpen)
        document.body.classList.remove('show-menu');
      else
        document.body.classList.add('show-menu');
      navIcon.attr('title', `Menü ${isOpen ? 'ein' : 'aus'}blenden`);
      icon.addClass('fa-spin');
      setTimeout(() => {
        icon.toggleClass('fa-navicon fa-close');
        icon.removeClass('fa-spin');
        if (!!this.options.menuOffsetTop)
          navIcon.css('top', 8 + (Number(!isOpen) * this.options.menuOffsetTop));
        if (!!this.options.menuOffsetRight)
          navIcon.css('right', 25 + (Number(!isOpen) * this.options.menuOffsetRight));
      }, 500);
      isOpen = !isOpen;
    };

    navIcon.on('click', function (e) { toggleSidebar(); });

  }

  isUserAdministrator() {
    let status = document.getElementById('loginStatus').innerText;
    let role = status.match(/\((.*)\)/);
    return (role ? role[1] === 'Administrator' : false);
  }

  maySyncNow() {
    if (this.options.syncStories < 1) return false;
    let lastSync = localStorage.getItem('lastAlienSync');
    let now = new Date();
    let maySync = (!lastSync || (new Date(lastSync).getTime() + this.options.pauseChecks < now.getTime()));
    if (maySync) localStorage.setItem('lastAlienSync', now);
    return maySync;
  }

  parseVersion(version) { 
    return parseInt(version.replace(/\./g, ''));
  }

  readAlienRSS() {
    let yql = 'https://query.yahooapis.com/v1/public/yql?q=';
    let query = `select ${this.options.titleField}, ${this.options.publishedField}${this.options.commentsField.length ? ', ' : ''}${this.options.commentsField} from rss where url="${urlJoin(this.options.targetUrl, this.options.rssFeedUrl, `?d=${new Date().getTime()}`)}"`;
    let endpoint = `${yql}${encodeURIComponent(query)}&format=json&${encodeURIComponent('env=store://datatables.org/alltableswithkeys')}`;

    let self = this;
    $.ajax({
      type: "GET",
      url: endpoint,
      dataType: "json",
      success: function (data) {
        if (data.query.count > 0) { // [ { title, commentUrl, comments, published }, ... ]
          let rssStories = self.readStoriesFromRssData(data.query.results.item);
          if (self.options.debug) console.log('Parsed RSS stories: ', rssStories);
          readStoriesSkin(rssStories);
        }
      }
    })
      .fail(function (jqXHR, type, error) {
        console.error(`YQL console error: ${type} | ${error}.`);
      });
  }

  readStoriesFromRssData(json) {
    let multiCommentFields = (this.options.multiParts.length > 1);
    if (this.options.debug) console.log(`YQL JSON: ${JSON.stringify(json, null, 2)}`);
    let rssStories = json.reduce((all, item) => {

      // eliminate seconds in published date
      let d = item[this.options.publishedField].split(':');
      d[d.length - 1] = '00 ' + d[d.length - 1].substr(3);

      let story = {
        title: item[this.options.titleField] || '...',
        published: new Date(d.join(':'))
      };

      if (item.hasOwnProperty(this.options.commentsField)) { // supposed there is comments data
        let theField = this.options.multiParts[0]; // 0: commentUrl, 1: comments
        if (multiCommentFields && $.isNumeric(item[this.options.commentsField])) {
          theField = this.options.multiParts[1];
        }
        story[theField] = item[this.options.commentsField];
      }

      all[story.published] =
        (all.hasOwnProperty(story.published) ? Object.assign(story, all[story.published]) : story);
      return all;

    }, {});

    return Object.keys(rssStories)
      .map(key => Object.assign({ comments: '0', commentUrl: '' }, rssStories[key]))
      .sort((a, b) => { return b.published.getTime() - a.published.getTime(); })
      .slice(0, this.options.syncStories);
  }

  restoreSavedParams() {
    let savedVersion = localStorage.getItem('savedAlienVersion');
    let savedStories = localStorage.getItem('savedAlienSkinStories');
    let savedParams = localStorage.getItem('savedAlienSkinParams');
    if (!savedVersion || !savedStories || !savedParams) return;
    if (this.parseVersion(document.body.dataset.version) <= this.parseVersion(savedVersion)) return;
    readStoriesSkinContent()
      .then(({ params }) => {
        params.skin = savedStories;
        return saveStoriesSkinContent(params);
      })
      .then(() => readParamsSkinContent())
      .then((params) => {
        params.skin = savedParams;
        return saveParamsSkinContent(params);
      })
      .then(() => {
        localStorage.removeItem('savedVersion'); // deactivate restore trigger
        toastr.success('Ihre Parameter und Einstellungen wurden erfolgreich wiederhergestellt!');
        toastr.info('Bitte laden Sie nun die Seite neu per "Hard-Reload" (Windows: Strg-F5, Mac: Cmd-R).');
      })
      .catch(err =>
        toastr.error(`Die Wiederherstellung der Parameter/Einstellungen endete mit Fehler: ${err}.`)
      );
  }

  saveCurrentParams() {
    readStoriesSkinContent()
      .then(({ skinStories }) => {
        localStorage.setItem('savedAlienSkinStories', JSON.stringify(skinStories));
        return readParamsSkinContent();
      })
      .then((params) => {
        localStorage.setItem('savedAlienSkinParams', params.skin);
        localStorage.setItem('savedAlienVersion', document.body.dataset.version);
        toastr.success('Ihre Parameter und Einstellungen wurden erfolgreich gesichert!');
      })
      .catch(err =>
        toastr.error(`Die Sicherung der Parameter/Einstellungen endete mit Fehler: ${err}.`)
      );
  }

}

(function ($) {
  "use strict";

  $.fn.alien = function () {

    let alien = new AlienInsideTwoday();
    return { implant: alien.implant.bind(alien) };

  };

})(jQuery);