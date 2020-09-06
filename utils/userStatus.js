/**
 * Get User status of installed Alien version
 * ==========================================
 * 
 */
const cheerio = require('cheerio');
const request = require('request-promise-native');

//request.debug = true; // uncomment to activate debugging
require('dotenv-safe').config();

// set some defaults
let req = request.defaults({
  followAllRedirects: true,
  jar: true,
  simple: false,
  rejectUnauthorized: false,
  resolveWithFullResponse: true
});

const users = process.env.USERSTATS.split('|');
const delayNextPromise = delay => new Promise(resolve => setTimeout(resolve, delay));

/**
 * Check off terms and establish auth cookie
 * @param void
 * @returns Promise
 */
const checkUserVersion = alias => {
  return req.get({
    url: `https://${alias}.twoday.net/`,
    transform: (body, response, resolveWithFullResponse) => {
      let $ = cheerio.load(body);
      let el = $('body')[0];
      let version = el.attribs['data-version'] || 'N/A';
      return { alias, version };
    }
  })
    .catch(err => {
      console.log(`checkUserVersion @ ${alias} failed with error:`, err);
    });
};

req.get('https://cdn.jsdelivr.net/gh/NeonWilderness/tdalien@latest/package.json')
  .then(pkg => {
    let currentVersion = JSON.parse(pkg.body).version;
    console.log(`\nCurrent Alien version is ${currentVersion}`);

    let promises = users.map((alias, index) => delayNextPromise(300 * index).then(() => checkUserVersion(alias)));
    return Promise.all(promises);
  })
  .then(results => {
    console.table(results);
  })
  .catch(err => {
    console.log(`checkUserVersions failed with error:`, err);
  });
