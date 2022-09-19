import './alien.less';
import {
  readStoriesSkin,
  readStoriesSkinContent,
  saveStoriesSkinContent,
  readParamsSkinContent,
  saveParamsSkinContent
} from './skin';
import { updateParamsSkinContent } from './params';
import urlJoin from 'url-join';

class AlienInsideTwoday {
  constructor() {
    this.defaults = {
      targetUrl: 'https://die-netzialisten.de',
      rssFeedUrl: 'feed',
      titleField: 'title',
      publishedField: 'pubDate',
      commentsField: 'comments',
      counterField: 'commentCount',
      allowComments: true, // false=don't allow comments on Twoday
      pauseChecks: 1000 * 60 * 2, // pause 2 min in between checks
      syncStories: 3,
      targetStory: true, // false=always jump to homepage, go directly to story if possible
      titlePrefix: '\u2709 $comments - ',
      titlePostfix: '',
      colorAlias: '#f7cf5e',
      colorNavIcon: '#f7cf5e',
      positionToast: 'toast-top-full-width',
      menuOffsetTop: 0,
      menuOffsetRight: 0,
      delayNewRelease: 1000 * 60 * 60 * 24 * 2, // delay new release update process/message for 2 days
      delayBetweenUpdates: 400, // delay in milliseconds to avoid server stress/denials
      redirectToNewSite: true, // leaves Twoday for all link clicks from non-admins
      needUpdateLevel: 'Owner', // who may launch the story update process: Owner | Admin
      debug: false
    };
    this.providerPostIdReg = {
      wordpress: /\?p=([0-9]*)/,
      nuxtjs: /\/([^/]+)\/?$/,
      blogger: /post-([0-9]*)/,
      tumblr: /post\/([0-9]*)/
    };
    this.functionUrl = 'https://statuesque-maamoul-5ba7b4.netlify.app/.netlify/functions/getrss';
    this.appUser = '{{appuser}}';
    this.noAlien = '{{noalien}}';
    this.alias = '';
  }

  checkNewVersionAvailability() {
    let delayRelease = localStorage.getItem('delayAlienRelease');
    if (delayRelease && Date.now() <= Number(delayRelease)) return;

    let self = this;

    $.getJSON('https://cdn.jsdelivr.net/gh/NeonWilderness/tdalien@latest/package.json', function (pkg) {
      if (self.parseVersion(pkg.version) > self.options.version) {
        $('#btnClose, #btnCancel').on('click', function (e) {
          e.preventDefault();
          $('#newVersion').fadeOut();
          if (e.target.id === 'btnClose') {
            // User clicked "not now!"
            let delayUntil = Date.now() + self.options.delayNewRelease;
            localStorage.setItem('delayAlienRelease', delayUntil);
          }
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

  /**
   * Identifies the RSS origin (Wordpress, Tumblr, Blogger) and returns the appropriate RegEx
   * to extract the post-id from the RSS items guid/id field
   * @param {string} generator RSS generator field
   * @returns {RegExp} appropriate to the RSS origin or null if origin is unknown
   */
  getFeedsPostIdSelector(generator) {
    let provider = Object.keys(this.providerPostIdReg),
      origin = '',
      i = 0;
    while (!origin && i < provider.length) {
      let platform = provider[i];
      if (generator.indexOf(platform) >= 0) origin = platform;
      i++;
    }
    return origin ? this.providerPostIdReg[origin] : null;
  }

  getNewBlogAlias() {
    let alias = this.options.targetUrl.replace('www.', '').match(/https?:\/\/(.*?)\./i);
    return alias ? alias[1] : '';
  }

  implant(options) {
    this.options = Object.assign({}, this.defaults, options);
    this.options.newBlogAlias = this.getNewBlogAlias();
    this.options.version = this.parseVersion(document.body.dataset.version);

    if (this.options.debug) console.log(`Alien Options: ${JSON.stringify(this.options, null, 2)}`);

    if (!this.isAppUser()) {
      $('#frame').attr('srcdoc', window.atob(this.noAlien));
      $('#showMenu')
        .attr('title', 'Zur Layoutübersicht')
        .on('click', function () {
          window.location.href = '/layouts';
        });
      return;
    }

    // set default iframe target to mainpage
    let iframeUrl = this.options.targetUrl;
    // does user want a story to be directly displayed if requested via /stories/xxxx link?
    if (window.location.pathname.toLowerCase().startsWith('/stories') && this.options.targetStory) {
      // yes, then if a single story actually is requested, there is an alienStatus in the body
      let alienStatus = $('.alienStatus').text();
      if (alienStatus) {
        try {
          let parsedStatus = JSON.parse(alienStatus);
          if (parsedStatus.link) iframeUrl = parsedStatus.link;
        } catch (err) {
          // on error: ignore and stick to mainpage
        }
      }
    }
    if (this.options.debug) console.log(`Using iframe url: ${iframeUrl}.`);

    let needUpdateLevel = this.options.needUpdateLevel.toString().toLowerCase().substr(0, 5);
    if (this.options.debug) console.log(`Required update level: ${needUpdateLevel}`);

    let isCreator = $('#createInfo>a').text() === '<% username %>';
    let isAdmin = this.isUserAdministrator();
    let canSync = (needUpdateLevel === 'owner' && isCreator) || (needUpdateLevel === 'admin' && isAdmin);

    if (!canSync && !!this.options.redirectToNewSite) {
      if (this.options.debug) console.log('Redirecting to new site.');
      window.location.replace(iframeUrl);
      return false;
    }

    this.options.colorAlias = this.options.colorAlias.toLowerCase();
    if (this.options.colorAlias !== this.defaults.colorAlias) $('#alias').css('color', this.options.colorAlias);

    let navIcon = $('#showMenu');
    this.options.colorNavIcon = this.options.colorNavIcon.toLowerCase();
    if (this.options.colorNavIcon !== this.defaults.colorNavIcon) navIcon.css('color', this.options.colorNavIcon);
    if (!!this.options.menuOffsetTop) navIcon.css('top', 8 + this.options.menuOffsetTop);
    if (!!this.options.menuOffsetRight) navIcon.css('right', 25 + this.options.menuOffsetRight);

    $('.alien').each((_idx, el) => {
      switch (el.tagName) {
        case 'A':
          /** @type {HTMLAnchorElement} */ (el).href = this.options.targetUrl;
          if (this.options.newBlogAlias.length)
            el.innerHTML = el.innerHTML.replace('<% site.alias %>', this.options.newBlogAlias);
          break;
        case 'IFRAME':
          /** @type { HTMLIFrameElement } */ (el).src = iframeUrl;
      }
    });

    toastr.options = {
      closeButton: false,
      newestOnTop: false,
      positionClass: this.options.positionToast,
      progressBar: true,
      timeOut: 8000
    };

    let loggedIn = '<% username %>'.length > 0;
    $(`.sign${loggedIn ? 'out' : 'in'}`)
      .show(0)
      .css('display', 'block');

    this.initClickFunctions();

    setTimeout(() => {
      if (canSync) {
        $('.adminOnly').show(0).css('display', 'block');

        this.checkNewVersionAvailability();

        this.restoreSavedParams();

        let $menuParams = $('#menuParams');
        if (this.options.targetUrl === this.defaults.targetUrl) {
          $menuParams.addClass('highlight');
          toastr.warning(
            '<div style="text-align:center">Bitte klicken Sie im Menü auf <b>Parameter/Einstellungen</b>, um <b>Ihren eigenen Blog</b> zu aktivieren!</div>'
          );
        } else {
          $menuParams.removeClass('highlight');
          if (this.maySyncNow()) this.readAlienRSS();
        }
      }
    }, 1000);
  }

  initClickFunctions() {
    let isOpen = false;
    let navIcon = $('#showMenu');
    let icon = navIcon.find('i');
    let toggleSidebar = () => {
      if (isOpen) document.body.classList.remove('show-menu');
      else document.body.classList.add('show-menu');
      navIcon.attr('title', `Menü ${isOpen ? 'ein' : 'aus'}blenden`);
      icon.addClass('fa-spin');
      setTimeout(() => {
        icon.toggleClass('fa-navicon fa-close');
        icon.removeClass('fa-spin');
        if (!!this.options.menuOffsetTop) navIcon.css('top', 8 + Number(!isOpen) * this.options.menuOffsetTop);
        if (!!this.options.menuOffsetRight) navIcon.css('right', 25 + Number(!isOpen) * this.options.menuOffsetRight);
      }, 500);
      isOpen = !isOpen;
    };

    navIcon.on('click', function (e) {
      toggleSidebar();
    });
  }

  isAppUser() {
    this.alias = document.getElementById('alias').innerText || '';
    return window.atob(this.appUser).split('|').indexOf(this.alias) >= 0;
  }

  isUserAdministrator() {
    let status = document.getElementById('loginStatus').innerText;
    let role = status.match(/\((.*)\)/);
    return role ? role[1] === 'Administrator' : false;
  }

  maySyncNow() {
    if (this.options.syncStories < 1) return false;
    let lastSync = localStorage.getItem('lastAlienSync');
    let now = new Date();
    let maySync = !lastSync || new Date(lastSync).getTime() + this.options.pauseChecks < now.getTime();
    if (maySync) localStorage.setItem('lastAlienSync', now.toString());
    return maySync;
  }

  parseVersion(version) {
    return version.split('.').reduce((all, vpart, index) => {
      all += vpart * 100 ** (2 - index);
      return all;
    }, 0);
  }

  readAlienRSS() {
    let self = this;
    $.getJSON(`${this.functionUrl}?url=${urlJoin(this.options.targetUrl, this.options.rssFeedUrl)}&alias=${this.alias}`, function (data) {
      if (data.items && data.items.length > 0) {
        let rssStories = self.readStoriesFromRssData(data);
        if (self.options.debug) console.log('Parsed RSS stories: ', rssStories);
        readStoriesSkin(rssStories, self.options);
      }
    }).fail(function (jqXHR, type, error) {
      console.error(`Netlify getrss error: ${type} | ${error}.`);
      toastr.error(`Das Lesen des RSS Feeds endete mit Fehler: ${type} - ${error}.`);
    });
  }

  readStoriesFromRssData(json) {
    if (this.options.debug) console.log(`Netlify getrss items: ${JSON.stringify(json, null, 2)}`);

    let regexPostId = this.getFeedsPostIdSelector(json.generator.toLowerCase());

    let rssStories = json.items.reduce((all, item) => {
      // get the unique post-id
      let postid = '';
      if (regexPostId) {
        let s = item.guid || item.id;
        let m = s.match(regexPostId);
        if (m) postid = m[1];
      }

      // potential post-id fallback if no avail through regex
      if (!postid && item.postid && item.postid._) postid = item.postid._;

      // eliminate seconds in published date
      let published = new Date(item[this.options.publishedField]);
      published.setSeconds(0, 0);

      // fix snippet content
      let contentSnippet =
        typeof item.contentSnippet !== 'string' ? '...' : item.contentSnippet.replace(/ Werbeanzeigen/gi, '');
      if (contentSnippet.slice(-1) !== '.') contentSnippet += '\u2026';

      let story = {
        postid,
        link: item.link || json.link,
        contentSnippet,
        title: item[this.options.titleField] || '...',
        published,
        commentUrl: item[this.options.commentsField] || `${item.link}#comments`,
        comments: item[this.options.counterField] || 0
      };

      if (this.options.debug) console.log(`story: ${JSON.stringify(story, null, 2)}`);

      all.push(story);
      return all;
    }, []);

    return rssStories
      .sort((a, b) => {
        return b.published.getTime() - a.published.getTime();
      })
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
      .then(params => {
        updateParamsSkinContent(params, savedParams, this.options);
        return saveParamsSkinContent(params);
      })
      .then(() => {
        localStorage.removeItem('savedAlienVersion'); // deactivate restore trigger
        toastr.success('Ihre Parameter und Einstellungen wurden erfolgreich wiederhergestellt!');
        toastr.info('Bitte laden Sie nun die Seite neu per "Hard-Reload" (Windows: Strg-F5, Mac: Cmd-R).');
      })
      .catch(err => toastr.error(`Die Wiederherstellung der Parameter/Einstellungen endete mit Fehler: ${err}.`));
  }

  saveCurrentParams() {
    readStoriesSkinContent()
      .then(({ skinStories }) => {
        localStorage.setItem('savedAlienSkinStories', JSON.stringify(skinStories));
        return readParamsSkinContent();
      })
      .then(params => {
        localStorage.setItem('savedAlienSkinParams', params.skin);
        localStorage.setItem('savedAlienVersion', document.body.dataset.version);
        toastr.success('Ihre Parameter und Einstellungen wurden erfolgreich gesichert!');
      })
      .catch(err => toastr.error(`Die Sicherung der Parameter/Einstellungen endete mit Fehler: ${err}.`));
  }
}

(function ($) {
  'use strict';

  $.fn['alien'] = function () {
    let alien = new AlienInsideTwoday();
    return { implant: alien.implant.bind(alien) };
  };
})(jQuery);
