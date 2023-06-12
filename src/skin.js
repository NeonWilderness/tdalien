/**
 * Read, create or update skins or stories on the Twoday Blogger platform
 * ======================================================================
 *
 */
const homeDomain = '<% site.href %>';

const alienStatus = status => {
  let clean = {
    title: status.title,
    published: status.published,
    link: status.link,
    comments: status.comments,
    postid: status.postid
  };
  let contentSnippet = status.contentSnippet || '...';
  return `<p>${contentSnippet}</p>
<div style="text-align:center"><a target="_blank" href="${
    status.link
  }">&raquo; Beitrag</a>&emsp;&emsp;<a target="_blank" href="${status.commentUrl}">&raquo; Kommentare</a></div>
<div class="alienStatus" style="display:none">${JSON.stringify(clean, null, 2)}</div>`;
};

const xhrError = (when, which, xhr) => {
  toastr.error(`Fehler beim ${when} von ${which}: ${xhr.status} | ${xhr.statusText}.`);
};

/**
 * Assures a timeout before the next http call
 * @param {number} delay ms to wait
 */
const delayNextPromise = delay => {
  return new Promise(resolve => setTimeout(resolve, delay));
};

const delayed = async (promise, delay) => {
  const result = await Promise.all([promise, delayNextPromise(delay)]);
  return result[0];
};

const getSkinData = data => {
  let $form = $(data).find('form');
  return {
    secretKey: $form.find('[name="secretKey"]').val(),
    action: $form.find('[name="action"]').val(),
    key: $form.find('[name="key"]').val(),
    skinset: $form.find('[name="skinset"]').val(),
    module: $form.find('[name="module"]').val(),
    title: $form.find('[name="title"]').val(),
    description: $form.find('[name="description"]').val(),
    skin: $form.find('[name="skin"]').val(),
    save: $form.find('[name="save"]').val()
  };
};

const readParamsSkinContent = () => {
  return new Promise((resolve, reject) => {
    $.get(`${homeDomain}layouts/alien/skins/edit?key=Site.implant`, function (data) {
      let params = getSkinData(data);
      resolve(params);
    }).fail(function (xhr, status, error) {
      xhrError('Lesen(get)', 'Skin Site.implant', xhr);
      reject();
    });
  });
};

const saveParamsSkinContent = params => {
  return new Promise((resolve, reject) => {
    $.post(`${homeDomain}layouts/alien/skins/edit?key=Site.implant`, params, function () {
      resolve();
    }).fail(function (xhr, status, error) {
      xhrError('Update(post)', 'Skin Site.implant', xhr);
      reject();
    });
  });
};

const readStoriesSkinContent = () => {
  return new Promise((resolve, reject) => {
    $.get(`${homeDomain}layouts/alien/skins/edit?key=Site.stories`, function (data) {
      let params = getSkinData(data);
      // @ts-ignore
      let skinStories = JSON.parse(params.skin || '[]');
      skinStories.forEach(story => {
        story.published = new Date(story.published);
      });
      resolve({ params, skinStories });
    }).fail(function (xhr, status, error) {
      xhrError('Lesen(get)', 'Skin Site.stories', xhr);
      reject();
    });
  });
};

const saveStoriesSkinContent = params => {
  return new Promise((resolve, reject) => {
    $.post(`${homeDomain}layouts/alien/skins/edit?key=Site.stories`, params, function () {
      resolve();
    }).fail(function (xhr, status, error) {
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
const compareStories = (rssStories, skinStories, self) => {
  const storyUnchanged = (rssStory, skinStory) => {
    if (self.options.debug) {
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

  self.log('!Story comparison rss vs. skin:');

  let checker = rssStories.reduce((all, story) => {
    all[properDateFormat(story.published)] = story;
    return all;
  }, {});

  if (self.options.debug) console.table(checker);

  return skinStories.reduce((all, story) => {
    let lookupKey = properDateFormat(story.published);
    if (all.hasOwnProperty(lookupKey) && storyUnchanged(all[lookupKey], story)) {
      delete all[lookupKey];
      self.log(`${lookupKey}: unchanged / no update.`);
    }
    return all;
  }, checker);
};

const readStoriesMain = (changedOrNewStories, self) => {
  return new Promise((resolve, reject) => {
    $.get(`${homeDomain}stories/main`, function (data) {
      const tdStories = {};
      const $admin = $(data).find('.admin');
      $admin.find('.storyData').each(function () {
        let [title, id, pubDate] = this.innerText.split(':¦:');
        pubDate = pubDate.trim();
        tdStories[pubDate] = id;
        self.log(`tdStory> title: ${title.trim()}, pubDate: ${pubDate}, id: ${id}`);
      });
      const finalStories = Object.keys(changedOrNewStories).reduce((all, published) => {
        const story = changedOrNewStories[published];
        const foundOnTwoday = tdStories.hasOwnProperty(published);
        if (foundOnTwoday) story.id = tdStories[published];
        self.log(
          `!Story "${story.title}", published: ${published}, ${foundOnTwoday ? 'exists @ id: ' + story.id : 'is new'}`
        );
        all.push(story);
        return all;
      }, []);
      resolve(finalStories);
    }).fail(function (xhr, status, error) {
      xhrError('Lesen(get)', 'Twoday Beitragsübersicht', xhr);
      reject();
    });
  });
};

const getFormData = data => {
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
    discussions: $discussions.prop('checked') ? $discussions.val() : null,
    checkbox_discussions: $form.find('[name="checkbox_discussions"]').val(),
    createtime: $form.find('[name="createtime"]').val(),
    publish: $form.find('[name="publish"]').val()
  };
};

const properDateFormat = date => {
  // formats date to "dd.mm.yyyy, hh:mm"
  const s = date.toLocaleString('de-DE', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit'
  });
  // reformats date to "yyyy-mm-dd hh:mm"
  return s.slice(0, 10).split('.').reverse().join('-') + s.slice(-6);
};

const compileStoryTitle = (title, comments, options) => {
  const prefix = options.titlePrefix.replace('$comments', comments);
  const postfix = options.titlePostfix.replace('$comments', comments);
  return `${prefix}${title || '...'}${postfix}`;
};

const createOrUpdateTwodayStory = async (story, options) => {
  const params = {
    // isCreate=false (Aktualisierung)
    false: {
      url: `stories/${story.id}/edit`,
      text: 'aktualisiert',
      method: 'update'
    },
    // isCreate=true (Neuanlage)
    true: {
      url: 'stories/create',
      text: 'neu angelegt',
      method: 'create'
    }
  };
  const isCreate = !story.hasOwnProperty('id');
  const sUrl = `${homeDomain}${params[isCreate].url}`;

  const getStory = () => {
    return new Promise((resolve, reject) => {
      $.get(sUrl, function (data) {
        story.alienLastUpdate = new Date().toISOString();
        let formData = getFormData(data);
        formData.content_title = compileStoryTitle(story.title, story.comments, options);
        formData.content_text = alienStatus(story);
        formData.createtime = properDateFormat(story.published);
        if (!options.allowComments || formData.discussions == null) delete formData.discussions;
        resolve(formData);
      }).fail(function (xhr, status, error) {
        xhrError(`${params[isCreate].method}(GET)`, `Twoday-Beitrag "${story.title}"`, xhr);
        reject();
      });
    });
  };

  const postStory = formData => {
    return new Promise((resolve, reject) => {
      $.post(sUrl, formData, function () {
        toastr.info(
          `Beitrag ${story.title} vom ${story.published.toLocaleString()} in Twoday ${params[isCreate].text}.`
        );
        resolve();
      }).fail(function (xhr, status, error) {
        xhrError(`${params[isCreate].method}(POST)`, `Twoday-Beitrag "${story.title}"`, xhr);
        reject();
      });
    });
  };

  const fd = await delayed(getStory(), options.delayBetweenUpdates);
  return await delayed(postStory(fd), options.delayBetweenUpdates);
};

const readStoriesSkin = async (rssStories, self) => {
  try {
    const { params, skinStories } = await delayed(readStoriesSkinContent(), self.options.delayBetweenUpdates);
    self.log(skinStories, '!Saved stories from last sync:');

    const changedOrNewStories = compareStories(rssStories, skinStories, self);
    if (Object.keys(changedOrNewStories).length) {
      const finalStories = await delayed(readStoriesMain(changedOrNewStories, self), self.options.delayBetweenUpdates);
      self.log(finalStories, '!Final stories to create or update:');
      for (const story of finalStories) {
        await delayed(createOrUpdateTwodayStory(story, self.options), self.options.delayBetweenUpdates);
      }
    } else {
      self.log('!No new stories or updates found.');
      toastr.info('Keine neuen zu synchronisierenden Änderungen gefunden!');
    }
    let newSkinContent = JSON.stringify(rssStories, null, 2);
    if (params.skin !== newSkinContent) {
      params.skin = newSkinContent;
      await delayed(saveStoriesSkinContent(params), self.options.delayBetweenUpdates);
    }
    toastr.success('Synchronisation erfolgreich abgeschlossen.');
  } catch (err) {
    toastr.error(`Synchronisation endete mit Fehler: ${err.toString()}.`);
  }
};

export {
  delayed,
  readStoriesSkin,
  readStoriesSkinContent,
  saveStoriesSkinContent,
  readParamsSkinContent,
  saveParamsSkinContent
};
