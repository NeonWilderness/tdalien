/**
 * Download the alienLayout to the local dist folder
 * =================================================
 * 
 */
const { req } = require('./_acceptTerms');
const cheerio = require('cheerio');
const downloadTargetFile = 'dist/alien-layout.zip';
const fs = require('fs');
const getAlienLayoutUrl = require('./_getAlienLayoutUrl');

/**
 * Request-Promise sequence to update a Twoday skin of the alien layout
 * @param blog  string name of Twoday blog
 * @param skin  object
 *   name       string skin name, e.g. 'Site.page'
 *   content    string skin content
 */
const downloadLayout = (blog) => {
  let downloadUrl = `${getAlienLayoutUrl(blog)}download`;
  console.log(`Preparing layout file creation at ${downloadUrl}.`);
  return req.get({
    uri: downloadUrl,
    transform: function (body) {
      let $ = cheerio.load(body);
      return {
        secretKey: $('[name="secretKey"]').val(),
      }
    }
  })
    .then(incoming => {
      console.log(`Now creating layout zip file at ${downloadUrl}.`);
      return req.post({
        uri: downloadUrl,
        form: {
          'secretKey': incoming.secretKey,
          'changesonly': 'Nur Änderungen'
        }
      });
    })
    .then(() => {
      console.log(`Downloading layout zip file at ${downloadUrl}.zip.`);
      return req.get(`${downloadUrl}.zip`).pipe(fs.createWriteStream(downloadTargetFile));
    })
    .then(() => {
      console.log(`Download successfully completed for ${downloadTargetFile}.`);
    })
    .catch(err => {
      console.log('Download ***failed*** with error', err);
    });
};

module.exports = downloadLayout;