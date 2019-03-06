/**
 * Update a skin on the Twoday blogger platform
 * ============================================
 * 
 */
const { req } = require('./_acceptTerms');
const cheerio = require('cheerio');
const getAlienLayoutUrl = require('./_getAlienLayoutUrl');

/**
 * Returns GET skin values to be used in a subsequent POST
 */
const getIncomingData = function (body, response, resolveWithFullResponse) {
  let $ = cheerio.load(body);
  return {
    secretKey: $('[name="secretKey"]').val(),
    action: $('[name="action"]').val(),
    key: $('[name="key"]').val(),
    skinset: $('[name="skinset"]').val(),
    module: $('[name="module"]').val(),
    title: $('[name="title"]').val(),
    description: $('[name="description"]').html(),
    save: $('[name="save"]').val()
  };
};

/**
 * Request-Promise sequence to update a Twoday skin of the alien layout
 * @param blog  string name of Twoday blog
 * @param skin  object
 *   name       string skin name, e.g. 'Site.page'
 *   content    string skin content
 */
const updateSkin = (blog, skin) => {
  let skinEditUrl = `${getAlienLayoutUrl(blog)}skins/edit?key=${skin.name}&skinset=&action=modified&module=`;
  console.log(`\nPreparing to edit skin at ${skinEditUrl}`);
  return req.get({
    uri: skinEditUrl,
    transform: getIncomingData
  })
    .then(incoming => {
      console.log(`Now updating skin ${skin.name} (len=${skin.content.length}).`);
      return req.post({
        uri: skinEditUrl,
        form: {
          'secretKey': incoming.secretKey,
          'action': incoming.action,
          'key': incoming.key,
          'skinset': incoming.skinset,
          'module': incoming.module,
          'title': incoming.title,
          'description': incoming.description,
          'skin': skin.content,
          'save': incoming.save
        }
      });
    })
    .then(() => {
      console.log(`Update successfully completed for skin: ${skin.name}`);
    })
    .catch(err => {
      console.log('Update ***failed*** for skin:', skin.name, 'with error', err);
    });
};

module.exports = updateSkin;