/**
 * downloadLayout: downloads the alienLayout zip file
 * ==================================================
 *
 */
const { argv } = require('yargs');
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

    await td.downloadLayout(alias, {
      name: 'alien',
      path: path.resolve(process.cwd(), 'dist/alien-layout.zip')
    });
  } catch (err) {
    console.log(`Error while downloading alien layout --> ${err}`);
  }
})();
