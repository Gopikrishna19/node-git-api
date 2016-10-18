const exec = require('child_process').exec;

const handler = yargv => {
  const args = yargv.usage('Usage: node-git create --name <name>')
    .describe('name', 'Name of the repository')
    .demand(['name'])
    .string('name')
    .nargs('name', 1)
    .alias('n', 'name')
    .help('help')
    .argv;

  if (!args.name) {
    throw args;
  }

  exec(`git init --bare ./repo/${args.name}`);
};

module.exports = [
  'create',
  'Create new repository',
  handler
];
