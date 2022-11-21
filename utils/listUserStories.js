/**
 * listUserStories: lists current user stories
 * ===========================================
 *
 */
const argv = require('yargs/yargs')(process.argv.slice(2)).argv;
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
    // get all layout names
    const layoutNames = await td.getLayoutNames(alias);
    console.log(`Blog ${alias} layouts:`, layoutNames);
    // get first page of most recent stories
    const data = await td.listStories(alias, 0);
    console.table(data.stories);
  } catch (err) {
    console.log(`Error --> ${err}`);
  }
})();
