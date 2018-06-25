/**
 * uploadSkin: uploads/updates a Twoday skin
 * =========================================
 * 
 */
const fs = require('fs');
const path = require('path');
const { loginTwoday } = require('./_login');
const getMemberships = require('./_getMemberships');
const updateSkin = require('./_updateSkin');
const argv = require('yargs').argv;

/**
 * Request-Promise sequence to update the Site.page and Site.alien skins
 */
if (!argv.blog) {
  console.log('Blogname must be specified with --blog=blogname or -b blogname.');
  return;
}
let blog = argv.blog.toLowerCase();
loginTwoday()
  .then(() => {
    console.log('Successfully logged into Twoday. Checking Memberships...');
    return getMemberships();
  })
  .then(adminBlogs => {
    if (adminBlogs.indexOf(blog) < 0) throw new Error('Blog not found or authorization failed.');
    console.log(`${blog} blog is authorized.`);
    let skin = fs.readFileSync(path.resolve(process.cwd(), './dist/site-page-skin.html'), 'utf-8');
    return updateSkin(blog, {
      name: 'Site.page',
      content: skin
    })
  })
  .then(() => {
    let js = fs.readFileSync(path.resolve(process.cwd(), './dist/alien.js'), 'utf-8');
    return updateSkin(blog, {
      name: 'Site.alien',
      content: `<script>${js}</script>`
    })
  })
  .catch(function (err) {
    console.log('Update ***failed*** for blog:', blog, 'with Error', err);
  });