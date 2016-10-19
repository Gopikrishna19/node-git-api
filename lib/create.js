const exec = require('../utils/exec');

const handler = yargv => {
  const args = yargv.usage('Usage: node-git create --name <name> [--dir <dir>]')

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

  if (!args.name) {
    throw args;
  }

  exec(`git init --bare ./${args.dir}/${args.name}`);
};

module.exports = [
  'create',
  'Create new repository',
  handler
];
