#!/usr/bin/env node
const yargs = require('yargs');
const createCommand = require('./lib/create');

const argv = module.exports = yargs
  .usage('Usage: node-git <cmd> [args]')
  .command(...createCommand)
  .help()
  .argv;

if (argv._.length < 1) {
  yargs.showHelp();
}
