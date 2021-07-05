/**
 * Get User status of installed Alien version
 * ==========================================
 *
 */
const { argv } = require('yargs');
const fetch = require('node-fetch');
const Twoday = require('@neonwilderness/twoday');

require('dotenv-safe').config();

if (!argv.platform) {
  console.log('Target platform must be specified with --platform=dev|prod');
  process.exit(1);
}
const platform = argv.platform.toLowerCase();
const users = process.env.USERSTATS.split('|');

(async () => {
  try {
    const response = await fetch('https://cdn.jsdelivr.net/gh/NeonWilderness/tdalien@latest/package.json');
    const pkg = await response.json();
    console.log(`\nCurrent Github Alien version is ${pkg.version}`);

    const td = new Twoday(platform);
    let userVersions = [];
    for (alias of users) {
      await td.delayNextPromise();
      const version = await td.checkUserAlienVersion(alias);
      userVersions.push({ alias, version });
    }
    console.table(userVersions);
  } catch (err) {
    console.log(`Alien version check failed with error --> ${err}`);
  }
})();
