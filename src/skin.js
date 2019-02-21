/**
 * Read, create or update skins or stories on the Twoday Blogger platform
 * ======================================================================
 * 
 */
const slugify = require('slugify');

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
    let xhr = $.get(`/layouts/alien/skins/edit?key=Site.implant`, function (data) {
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
    let xhr = $.post(`/layouts/alien/skins/edit?key=Site.implant`, params, function () {
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
    let xhr = $.get(`/layouts/alien/skins/edit?key=Site.stories`, function (data) {
      let params = getSkinData(data);
      let skinStories = JSON.parse(params.skin);
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
    let xhr = $.post(`/layouts/alien/skins/edit?key=Site.stories`, params, function () {
      resolve();
    })
      .fail(() => {
        xhrError('Update(post)', 'Skin Site.stories', xhr);
        reject();
      });

  });
};

/**
 * Finds and returns all stories that have changed or a plain new
 * @param {array} rssStories - story data from current RSS
 * @param {array} skinStories - saved story data from last update run
 * @returns {array} filtered stories (new or changed)
 */
const compareStories = (rssStories, skinStories) => {

  const storyUnchanged = (rssStory, skinStory) => {
    return (
      rssStory.comments == skinStory.comments &&
      rssStory.title == skinStory.title &&
      rssStory.contentSnippet == skinStory.contentSnippet
    );
  };

  const useKeyPostId = story => story.postid;
  const useKeyPublished = story => story.published.getTime();

  let useAsKey = (
    rssStories.length &&
    rssStories[0].postid.length &&
    (skinStories.length === 0 || 
      (skinStories.length && 'postid' in skinStories[0] && skinStories[0].postid.length)
    ) ? useKeyPostId : useKeyPublished
  );

  let checker = rssStories.reduce((all, story) => {
    all[useAsKey(story)] = story;
    return all;
  }, {});

  return skinStories.reduce((all, story) => {
    let lookupKey = useAsKey(story);
    if (all.hasOwnProperty(lookupKey) && storyUnchanged(all[lookupKey], story)) {
      delete all[lookupKey];
    }
    return all;
  }, checker);

};

const slugifyTitle = title => slugify(title || '...');

const readStoriesMain = (changedOrNewStories, options) => {

  return new Promise((resolve, reject) => {
    let xhr = $.get('/stories/main', function (data) {
      let tdStories = {};
      let $admin = $(data).find('.admin');
      $admin.find('.storyData').each(function () {
        let [title, id] = this.innerText.split('|');
        let slug = slugifyTitle(title);
        tdStories[slug] = id;
        if (options.debug) console.log('title:', title, 'slug:', slug, 'id:', id);
      });
      let finalStories = Object.keys(changedOrNewStories).reduce((all, key) => {
        let story = changedOrNewStories[key];
        let slug = slugifyTitle(story.title);
        if (options.debug) console.log('Searching slug:', slug, 'found:', tdStories.hasOwnProperty(slug));
        if (tdStories.hasOwnProperty(slug)) story.id = tdStories[slug];
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

const compileStoryTitle = (title, comments, options) => {
  let prefix = options.titlePrefix.replace('$comments', comments);
  let postfix = options.titlePostfix.replace('$comments', comments);
  return `${prefix}${title || '...'}${postfix}`;
};

const updateTwodayStory = (story, options) => {

  return new Promise((resolve, reject) => {

    let storyEditUrl = `/stories/${story.id}/edit`;
    let xhr = $.get(storyEditUrl, function (data) {

      story.alienLastUpdate = new Date().toISOString();
      let formData = getFormData(data);

      let $content = $(`<div>${formData.content_text}</div>`);
      let $alienStatus = $content.find('.alienStatus');
      if ($alienStatus.length)
        $alienStatus.text(JSON.stringify(story, null, 2));
      else
        $content.append(alienStatus(story));
      formData.content_title = compileStoryTitle(story.title, story.comments, options);
      formData.content_text = $content.html();
      formData.createtime = `${story.published.toISOString().substr(0, 10)} ${story.published.toTimeString().substr(0, 5)}`;
      if (formData.discussions == null) delete formData.discussions;

      xhr = $.post(storyEditUrl, formData, function () {
        toastr.info(`Beitrag ${story.title} vom ${story.published.toLocaleString()} in Twoday aktualisiert.`);
        resolve();
      })
        .fail(() => {
          xhrError('Update(post)', `Twoday-Beitrags ${story.id}`, xhr);
          reject();
        });
    })
      .fail(() => {
        xhrError('Update(get)', `Twoday-Beitrags ${story.id}`, xhr);
        reject();
      });

  });

};

const createTwodayStory = (story, options) => {

  return new Promise((resolve, reject) => {

    let storyCreateUrl = `/stories/create`;
    let xhr = $.get(storyCreateUrl, function (data) {

      story.alienLastUpdate = new Date().toISOString();
      let formData = getFormData(data);
      formData.content_title = compileStoryTitle(story.title, story.comments, options);
      formData.content_text = alienStatus(story);
      formData.createtime = `${story.published.toISOString().substr(0, 10)} ${story.published.toTimeString().substr(0, 5)}`;
      if (!options.allowComments) delete formData.discussions;

      xhr = $.post(storyCreateUrl, formData, function () {
        toastr.info(`Beitrag ${story.title} vom ${story.published.toLocaleString()} in Twoday neu angelegt.`);
        resolve();
      })
        .fail(() => {
          xhrError('Anlegen(post)', `Twoday-Beitrags ${story.id}`, xhr);
          reject();
        });
    })
      .fail(() => {
        xhrError('Anlegen(get)', `Twoday-Beitrags ${story.id}`, xhr);
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
      const changedOrNewStories = compareStories(rssStories, skinStories);
      if (Object.keys(changedOrNewStories).length > 0)
        return readStoriesMain(changedOrNewStories, options);
      else
        return Promise.resolve([]);
    })
    .then(finalStories => {
      if (options.debug) console.log('finalStories: ', finalStories);
      if (finalStories && finalStories.length) {
        let promises = finalStories.map(story => {
          if (story.hasOwnProperty('id'))
            return updateTwodayStory(story, options);
          else
            return createTwodayStory(story, options);
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