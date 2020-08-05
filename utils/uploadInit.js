/**
 * uploadInit: uploads/updates some Twoday skins to prepare for new layout release
 * ===============================================================================
 * 
 */
const fs = require('fs');
const path = require('path');
const { acceptTerms } = require('./_acceptTerms');
const { loginTwoday } = require('./_login');
const getMemberships = require('./_getMemberships');
const updateSkin = require('./_updateSkin');
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
    let skin = fs.readFileSync(path.resolve(process.cwd(), './src/skins/Site-implant.html'), 'utf-8');
    return updateSkin(blog, {
      name: 'Site.implant',
      content: skin
    })
  })
  .then(() => {
    return updateSkin(blog, {
      name: 'Site.stories',
      content: '[]'
    })
  })
  .catch(err => {
    console.log('Update ***failed*** for blog:', blog, 'with Error', err);
  });