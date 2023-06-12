/**
 * downloadLayout: downloads the alienLayout zip file
 * ==================================================
 *
 */
const argv = require('yargs/yargs')(process.argv.slice(2)).argv;
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
    const td = new twoday.Twoday(platform, { delay: 300 });
    await td.login();

    await td.downloadLayout(alias, {
      name: 'alien',
      path: path.resolve(process.cwd(), 'dist/alien-layout.zip')
    });
  } catch (err) {
    console.log(`Error while downloading alien layout --> ${err}`);
  }
})();
