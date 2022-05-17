const firefox = process.argv.includes('--firefox') ? 'firefox' : '';
const edge = process.argv.includes('--edge') ? 'edge' : '';
const browser = firefox || edge || 'chrome';

// require("tsconfig-paths/register");
require('ts-node').register({ transpileOnly: true, logError: true });
module.exports = require(`./wdio.${browser}.conf.ts`);