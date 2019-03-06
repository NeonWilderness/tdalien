/**
 * downloadLayout: downloads the alienLayout zip file 
 * ==================================================
 * 
 */
const { acceptTerms } = require('./_acceptTerms');
const { loginTwoday } = require('./_login');
const getMemberships = require('./_getMemberships');
const downloadLayout = require('./_download');
const argv = require('yargs').argv;

let blog = (argv.blog ? argv.blog.toLowerCase() : 'foundation');
acceptTerms()
  .then(() => {
    console.log('Terms accepted. Now logging in...');
    return loginTwoday();
  })
  .then(() => {
    console.log('Successfully logged into Twoday. Checking Memberships...');
    return getMemberships();
  })
  .then(adminBlogs => {
    if (adminBlogs.indexOf(blog) < 0) throw new Error('Blog not found or authorization failed.');
    console.log(`${blog} blog is authorized.`);
    return downloadLayout(blog);
  })
  .catch(err => {
    console.log('Update ***failed*** for blog:', blog, 'with Error', err);
  });