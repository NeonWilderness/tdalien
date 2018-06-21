const argv = require('yargs').argv;
const fs = require('fs');
const path = require('path');
const semver = require('semver');

/**
 * Bump version and update package.json
 */
const bump = (mode) => { // major | minor | patch (=default)
  let file = path.resolve(process.cwd(), 'package.json');
  let pkg = JSON.parse(fs.readFileSync(file));
  let newVersion = semver.inc(pkg.version, mode);
  console.log(`Version ${pkg.version} bumped to ${newVersion}.`);
  pkg.version = newVersion;
  fs.writeFileSync(file, JSON.stringify(pkg, null, 2));
}

bump(argv.mode || 'patch');