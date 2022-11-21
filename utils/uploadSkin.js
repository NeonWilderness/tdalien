/**
 * uploadSkin: uploads/updates alien skins
 * =======================================
 *
 */
const argv = require('yargs/yargs')(process.argv.slice(2)).argv;
const fs = require('fs');
const path = require('path');
const twoday = require('@neonwilderness/twoday');

require('dotenv-safe').config();

if (!argv.alias) {
  console.log('Blog alias must be specified with --alias=blogname');
  process.exit(1);
}
const alias = argv.alias.toLowerCase();

if (!argv.platform) {
  console.log('Target platform must be specified with --platform=dev|prod');
  process.exit(1);
}
const platform = argv.platform.toLowerCase();

(async () => {
  try {
    const td = new twoday.Twoday(platform);
    await td.login();
    await td.useLayout(alias, 'alien');

    await td.updateSkin(alias, 'Site.page', {
      skin: fs.readFileSync(path.resolve(process.cwd(), './dist/site-page-skin.html'))
    });

    await td.updateSkin(alias, 'Story.mgrlistitem', {
      skin: fs.readFileSync(path.resolve(process.cwd(), './src/skins/Story-mgrlistitem.html'))
    });

    let js = fs.readFileSync(path.resolve(process.cwd(), './dist/alien.js'));
    await td.updateSkin(alias, 'Site.alien', { skin: `<script>${js}</script>` });
  } catch (err) {
    console.log(`Error while uploading alien skins --> ${err}`);
  }
})();
