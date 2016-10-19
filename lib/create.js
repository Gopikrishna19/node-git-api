const exec = require('../utils/exec');

exports.command = 'create';
exports.desc = 'Create new repository';
exports.builder = yargs =>
  yargs.usage('Usage: node-git create --name <name> [--dir <dir>]')

    .describe('name', 'Name of the repository')
    .demand(['name'])
    .string('name')
    .nargs('name', 1)
    .alias('name', 'n')

    .describe('dir', 'Directory to create the repository into')
    .string('dir')
    .nargs('dir', 1)
    .alias('dir', 'd')

    .defaults({
      dir: 'repo'
    })

    .help('help')
    .argv;
exports.handler = argv => {
  if (!argv.name) {
    throw argv;
  }

  exec(`git init --bare ./${argv.dir}/${argv.name}`);
};
