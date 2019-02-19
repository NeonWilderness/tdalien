/**
 * Get the memberships filtered by auth level Owner/Admin
 * ======================================================
 * 
 */
const { req } = require('./_acceptTerms');
const cheerio = require('cheerio');

/**
 * Read the memberships page and returns a blog name array with all Owner/Administrator blogs
 * @param void
 * @returns array of blog names
 */
const getMemberships = () => {
  return req.get({
    url: 'https://www.twoday.net/members/memberships',
    transform: (body, response, resolveWithFullResponse) => {
      let $ = cheerio.load(body);
      let adminBlogs = [];
      $('.listItem').each( (index, el) => {
        let $el = $(el);
        let authLevel = $el.find('.listItemLeft').text().match(/Status: (.*)\s/)[1];
        if (authLevel === 'Owner' || authLevel === 'Administrator') {
          adminBlogs.push( $el.find('.listItemRight a').eq(0).attr('href').match(/\/\/(.*?).twoday.net/)[1] );
        }
      });
      return adminBlogs;
    }
  })
  .catch(err => {
    console.log('getMemberships failed with error:', err);
  });
};

module.exports = getMemberships;