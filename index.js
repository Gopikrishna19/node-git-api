#!/usr/bin/env node
const yargs = require('yargs');

module.exports = yargs
  .usage('Usage: node-git <cmd> [args]')
  .commandDir('lib')
  .demand(1)
  .help()
  .argv;
