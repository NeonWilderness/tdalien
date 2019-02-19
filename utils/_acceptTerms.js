/**
 * Accept Terms step
 * =================
 * 
 */
const request = require('request-promise-native');

//request.debug = true; // uncomment to activate debugging
require('dotenv-safe').load();

// set some defaults
let req = request.defaults({
  followAllRedirects: true,
  jar: true,
  simple: false,
  rejectUnauthorized: false,
  resolveWithFullResponse: true
});

const termsUrl = 'https://www.twoday.net/terms';

/**
 * Check off terms and establish auth cookie
 * @param void
 * @returns Promise
 */
const acceptTerms = () => {
  return req.post({
    url: termsUrl,
    form: {
      'path': '',
      'accept': 1
    }
  })
  .catch(err => {
    console.log('Terms failed with error:', err);
  });
};

module.exports = { req, acceptTerms };