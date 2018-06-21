/**
 * Read and update a skin on the Twoday Blogger platform
 * =====================================================
 * 
 */
const slugify = require('slugify');

const alienStatus = (status) => {
  return `<div class="alienStatus" style="display:none">${JSON.stringify(status, null, 2)}</div>`;
};

const xhrError = (when, which, xhr) => {
  toastr.error(`Fehler beim ${when} von ${which}: ${xhr.status} | ${xhr.statustext}.`);
};

const readStoriesSkinContent = () => {
  return new Promise((resolve, reject) => {
    let xhr = $.get(`/layouts/alien/skins/edit?key=Site.stories`, function (data) {
      let $form = $(data).find('form');
      let params = {
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
      let skinStories = JSON.parse(params.skin);
      skinStories.forEach(story => { story.published = new Date(story.published); });
      console.log('readStoriesSkinContent: ', params, skinStories);
      resolve({ params, skinStories });
    })
      .fail(() => {
        xhrError('Lesen(get)', 'Skin.stories', xhr);
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
        xhrError('Update(post)', `Skin.stories`, xhr);
        reject();
      });

  });
};

const compareStories = (rssStories, skinStories) => {

  let checker = rssStories.reduce((all, story) => {
    all[story.published.getTime()] = story;
    return all;
  }, {});

  return skinStories.reduce((all, story) => {
    let lookupKey = story.published.getTime();
    if (all.hasOwnProperty(lookupKey)) {
      if (!all[lookupKey].hasOwnProperty('comments'))
        delete all[lookupKey];
      else
        if (all[lookupKey].comments == story.comments)
          delete all[lookupKey];
    }
    return all;
  }, checker);

};

const slugifyTitle = title => slugify(title || '...');

const readStoriesMain = (changedOrNewStories) => {

  return new Promise((resolve, reject) => {
    let xhr = $.get('/stories/main', function (data) {
      let tdStories = {};
      let $admin = $(data).find('.admin');
      $admin.find('.storyData').each(function () {
        let [title, id] = this.innerText.split('|');
        let slug = slugifyTitle(title);
        tdStories[slug] = id;
        console.log('title:', title, 'slug:', slug, 'id:', id);
      });
      let finalStories = Object.keys(changedOrNewStories).reduce((all, key) => {
        let story = changedOrNewStories[key];
        let slug = slugifyTitle(story.title);
        console.log('Searching slug:', slug, 'found:', tdStories.hasOwnProperty(slug));
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
    discussions: $form.find('[name="discussions"]').val(),
    checkbox_discussions: $form.find('[name="checkbox_discussions"]').val(),
    createtime: $form.find('[name="createtime"]').val(),
    publish: $form.find('[name="publish"]').val()
  };
};

const updateTwodayStory = (story) => {

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
      formData.content_title = story.title || '...';  
      formData.content_text = $content.html();
      formData.createtime = `${story.published.toISOString().substr(0,10)} ${story.published.toTimeString().substr(0,5)}`;

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

const createTwodayStory = (story) => {

  return new Promise((resolve, reject) => {

    let storyCreateUrl = `/stories/create`;
    let xhr = $.get(storyCreateUrl, function (data) {

      story.alienLastUpdate = new Date().toISOString();
      let formData = getFormData(data);
      formData.content_title = story.title || '...';  
      formData.content_text = alienStatus(story);
      formData.createtime = `${story.published.toISOString().substr(0,10)} ${story.published.toTimeString().substr(0,5)}`;

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

const readStoriesSkin = (rssStories) => {
  var skinParams = {};

  readStoriesSkinContent()
    .then(({ params, skinStories }) => {
      skinParams = params;
      const changedOrNewStories = compareStories(rssStories, skinStories);
      if (Object.keys(changedOrNewStories).length > 0)
        return readStoriesMain(changedOrNewStories);
    })
    .then(finalStories => {
      console.log('finalStories: ', finalStories);
      if (finalStories && finalStories.length) {
        let promises = finalStories.map(story => {
          if (story.hasOwnProperty('id'))
            return updateTwodayStory(story);
          else
            return createTwodayStory(story);
        });
        return Promise.all(promises);
      } else {
        toastr.info('Keine neuen zu synchronisierenden Änderungen gefunden!');
        return false;
      }
    })
    .then(() => {
      skinParams.skin = JSON.stringify(rssStories, null, 2);
      return saveStoriesSkinContent(skinParams);
    })
    .then(() => {
      toastr.success('Synchronisation erfolgreich abgeschlossen.');
    })
    .catch(err =>
      toastr.error(`Synchronisation endete mit Fehler: ${err}.`)
    );
};

module.exports = { readStoriesSkin };