/* eslint-disable no-sync */
const version = process.argv[2]

const path = `${__dirname}/../templates/manifest.json`
const manifest = require(path)

require('fs').writeFileSync(path, `${JSON.stringify({ ...manifest, version }, null, 2)}\n`)
require('child_process').execSync(
  `git commit -am ${version}.0 && git tag -a ${version}.0 -m ${version}.0`,
)
