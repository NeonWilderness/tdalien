/**
 * Read, create or update skins or stories on the Twoday Blogger platform
 * ======================================================================
 * 
 */
const alienStatus = (status) => {
  let clean = {
    title: status.title,
    published: status.published,
    link: status.link,
    comments: status.comments,
    postid: status.postid    
  };
  let contentSnippet = status.contentSnippet || '...';
  return `<p>${contentSnippet}</p>
<div style="text-align:center"><a target="_blank" href="${status.link}">&raquo; Beitrag</a>&emsp;&emsp;<a target="_blank" href="${status.commentUrl}">&raquo; Kommentare</a></div>
<div class="alienStatus" style="display:none">${JSON.stringify(clean, null, 2)}</div>`;
};

const xhrError = (when, which, xhr) => {
  toastr.error(`Fehler beim ${when} von ${which}: ${xhr.status} | ${xhr.statustext}.`);
};

/**
 * Assures a timeout before the next promise http call
 * @param {number} delay ms to wait
 */
const delayNextPromise = (delay => {
  return new Promise(resolve => setTimeout(resolve, delay));
});

const getSkinData = (data) => {
  let $form = $(data).find('form');
  return {
    secretKey: $form.find('[name=secretKey]').val(),
    action: $form.find('[name="action"]').val(),
    key: $form.find('[name="key"]').val(),
    skinset: $form.find('[name="skinset"]').val(),
    module: $form.find('[name="module"]').val(),
    title: $form.find('[name="title"]').val(),
    description: $form.find('[name="description"]').html(),
    skin: $form.find('[name=skin]').val(),
    save: $form.find('[name="save"]').val()
  };
};

const readParamsSkinContent = () => {
  return new Promise((resolve, reject) => {
    let xhr = $.get('/layouts/alien/skins/edit?key=Site.implant', function (data) {
      let params = getSkinData(data);
      resolve(params);
    })
      .fail(() => {
        xhrError('Lesen(get)', 'Skin Site.implant', xhr);
        reject();
      });

  });
};

const saveParamsSkinContent = (params) => {
  return new Promise((resolve, reject) => {
    let xhr = $.post('/layouts/alien/skins/edit?key=Site.implant', params, function () {
      resolve();
    })
      .fail(() => {
        xhrError('Update(post)', 'Skin Site.implant', xhr);
        reject();
      });

  });
};

const readStoriesSkinContent = () => {
  return new Promise((resolve, reject) => {
    let xhr = $.get('/layouts/alien/skins/edit?key=Site.stories', function (data) {
      let params = getSkinData(data);
      let skinStories = JSON.parse(params.skin || '[]');
      skinStories.forEach(story => { story.published = new Date(story.published); });
      resolve({ params, skinStories });
    })
      .fail(() => {
        xhrError('Lesen(get)', 'Skin Site.stories', xhr);
        reject();
      });

  });
};

const saveStoriesSkinContent = (params) => {
  return new Promise((resolve, reject) => {
    let xhr = $.post('/layouts/alien/skins/edit?key=Site.stories', params, function () {
      resolve();
    })
      .fail(() => {
        xhrError('Update(post)', 'Skin Site.stories', xhr);
        reject();
      });

  });
};

/**
 * Finds and returns all stories that have changed or are plain new
 * @param {array} rssStories - story data from current RSS
 * @param {array} skinStories - saved story data from last update run
 * @returns {array} filtered stories (new or changed)
 */
const compareStories = (rssStories, skinStories, options) => {

  const storyUnchanged = (rssStory, skinStory) => {
    if (options.debug) { 
      let rss = { title: rssStory.title, comments: rssStory.comments, snippet: rssStory.contentSnippet };
      let skin = { title: skinStory.title, comments: skinStory.comments, snippet: skinStory.contentSnippet };
      console.table({ rss, skin });
    }
    return (
      rssStory.comments === skinStory.comments &&
      rssStory.title === skinStory.title &&
      rssStory.contentSnippet === skinStory.contentSnippet
    );
  };

  if (options.debug) console.log('=> Story comparison rss/skin:');

  let checker = rssStories.reduce((all, story) => {
    all[properDateFormat(story.published)] = story;
    return all;
  }, {});

  return skinStories.reduce((all, story) => {
    let lookupKey = properDateFormat(story.published);
    if (all.hasOwnProperty(lookupKey) && storyUnchanged(all[lookupKey], story)) {
      delete all[lookupKey];
    }
    return all;
  }, checker);

};

const readStoriesMain = (changedOrNewStories, options) => {

  return new Promise((resolve, reject) => {
    let xhr = $.get('/stories/main', function (data) {
      let tdStories = {};
      let $admin = $(data).find('.admin');
      $admin.find('.storyData').each(function () {
        let [title, id, pubDate] = this.innerText.split(':¦:');
        pubDate = pubDate.trim();
        tdStories[pubDate] = id;
        if (options.debug)
          console.log(`storyData> title: ${title}, pubDate: ${pubDate}, id: ${id}`);
      });
      let finalStories = Object.keys(changedOrNewStories).reduce((all, published) => {
        let story = changedOrNewStories[published];
        if (options.debug) 
          console.log(`Searching story: ${story.title}, published: ${published}, found: ${tdStories.hasOwnProperty(published)}`);
        if (tdStories.hasOwnProperty(published)) story.id = tdStories[published];
        all.push(story);
        return all;
      }, []);
      resolve(finalStories);
    })
      .fail(() => {
        xhrError('Lesen(get)', 'Twoday Beitragsübersicht', xhr);
        reject();
      });

  });

};

const getFormData = (data) => {
  let $form = $(data).find('form');
  let $discussions = $form.find('[name="discussions"]');
  return {
    secretKey: $form.find('[name="secretKey"]').val(),
    content_title: $form.find('[name="content_title"]').val(),
    modNiceUrls_urlid: $form.find('[name="modNiceUrls_urlid"]').val(),
    content_text: $form.find('[name="content_text"]').val(),
    addToFront: $form.find('[name="addToFront"]').val(),
    checkbox_addToFront: $form.find('[name="checkbox_addToFront"]').val(),
    addToTopic: $form.find('[name="addToTopic"]').val(),
    topic: $form.find('[name="topic"]').val(),
    editableby: $form.find('[name="editableby"]').val(),
    discussions: ($discussions.prop('checked') ? $discussions.val() : null),
    checkbox_discussions: $form.find('[name="checkbox_discussions"]').val(),
    createtime: $form.find('[name="createtime"]').val(),
    publish: $form.find('[name="publish"]').val()
  };
};

const properDateFormat = (date) => {
  // formats date to "dd.mm.yyyy, hh:mm"
  let s = date.toLocaleString('de-DE', {
    year: 'numeric', 
    month: '2-digit', 
    day: '2-digit', 
    hour: '2-digit', 
    minute: '2-digit'
  });
  // reformats date to "yyyy-mm-dd hh:mm"
  return s.substr(0, 10).split('.').reverse().join('-') + s.slice(-6);
};

const compileStoryTitle = (title, comments, options) => {
  let prefix = options.titlePrefix.replace('$comments', comments);
  let postfix = options.titlePostfix.replace('$comments', comments);
  return `${prefix}${title || '...'}${postfix}`;
};

const createOrUpdateTwodayStory = (story, options) => {

  const params = {
    // isCreate=false (Aktualisierung)
    false: {
      url: `/stories/${story.id}/edit`,
      text: 'aktualisiert',
      method: 'update'
    },
    // isCreate=true (Neuanlage)
    true: {
      url: '/stories/create',
      text: 'neu angelegt',
      method: 'create'
    }
  };
  const isCreate = !story.hasOwnProperty('id');

  return new Promise((resolve, reject) => {

    let xhr = $.get(params[isCreate].url, function (data) {

      story.alienLastUpdate = new Date().toISOString();
      let formData = getFormData(data);
      formData.content_title = compileStoryTitle(story.title, story.comments, options);
      formData.content_text = alienStatus(story);
      formData.createtime = properDateFormat(story.published);
      if (!options.allowComments || formData.discussions == null) delete formData.discussions;

      xhr = $.post(params[isCreate].url, formData, function () {
        toastr.info(`Beitrag ${story.title} vom ${story.published.toLocaleString()} in Twoday ${params[isCreate].text}.`);
        resolve();
      })
        .fail(() => {
          xhrError(`${params[isCreate].method}(POST)`, `Twoday-Beitrag "${story.title}"`, xhr);
          reject();
        });
    })
      .fail(() => {
        xhrError(`${params[isCreate].method}(GET)`, `Twoday-Beitrag "${story.title}"`, xhr);
        reject();
      });

  });

};

const readStoriesSkin = (rssStories, options) => {
  var skinParams = {};

  readStoriesSkinContent()
    .then(({ params, skinStories }) => {
      if (options.debug) console.log('readStoriesSkinContent: ', skinStories);
      skinParams = params;
      const changedOrNewStories = compareStories(rssStories, skinStories, options);
      if (Object.keys(changedOrNewStories).length > 0)
        return readStoriesMain(changedOrNewStories, options);
      else
        return Promise.resolve([]);
    })
    .then(finalStories => {
      if (options.debug) console.log('finalStories: ', finalStories);
      if (finalStories && finalStories.length) {
        let promises = finalStories.map((story, index) => {
          return delayNextPromise(index * options.delayBetweenUpdates)
            .then(() => createOrUpdateTwodayStory(story, options));
        });
        return Promise.all(promises);
      } else {
        toastr.info('Keine neuen zu synchronisierenden Änderungen gefunden!');
        return false;
      }
    })
    .then(() => {
      let newSkinContent = JSON.stringify(rssStories, null, 2);
      if (skinParams.skin !== newSkinContent) {
        skinParams.skin = newSkinContent;
        return saveStoriesSkinContent(skinParams);
      } else return Promise.resolve();
    })
    .then(() => {
      toastr.success('Synchronisation erfolgreich abgeschlossen.');
    })
    .catch(err =>
      toastr.error(`Synchronisation endete mit Fehler: ${err}.`)
    );
};

export {
  readStoriesSkin,
  readStoriesSkinContent,
  saveStoriesSkinContent,
  readParamsSkinContent,
  saveParamsSkinContent
};
