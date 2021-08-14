/**
 * uploadInit: uploads/updates some Twoday skins to prepare for new layout release
 * ===============================================================================
 *
 */
const { argv } = require('yargs');
const fs = require('fs');
const path = require('path');
const Twoday = require('@neonwilderness/twoday');

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
    const td = new Twoday(platform);
    await td.login();
    await td.useLayout(alias, 'alien');

    await td.updateSkin(alias, 'Site.implant', {
      skin: fs.readFileSync(path.resolve(process.cwd(), './src/skins/Site-implant.html'))
    });

    await td.updateSkin(alias, 'Story.mgrlistitem', {
      skin: fs.readFileSync(path.resolve(process.cwd(), './src/skins/Story-mgrlistitem.html'))
    });

    await td.updateSkin(alias, 'Site.stories', { skin: '[]' });
  } catch (err) {
    console.log(`Error while initializing new alien release --> ${err}`);
  }
})();
