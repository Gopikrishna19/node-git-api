const fs = require('fs');
const {execSync} = require('child_process');
const gitLog = 'git log --pretty=format:{\\"commit\\":\\"%h\\",\\"author\\":\\"%an\\",\\"relativeTime\\":\\"%ar\\",\\"commitMessage\\":\\"%s\\",\\"commitTime\\":\\"%ad\\"}';

function buildInfo(repository, name) {
  try {
    const logs = execSync(`${gitLog} -1`, {
      cwd: repository,
      stdio: []
    }).toString();

    return {
      commits: logs.split('\n').map(log => JSON.parse(log)),
      name
    };
  } catch (e) {
    if (/any commits yet/ig.test(e.message)) {
      return {
        name
      };
    }
  }
}

exports.command = 'list';
exports.desc = 'List repositories';

exports.builder = yargs =>
  yargs.usage('Usage: node-git list [--dir <dir>] [--json]')

    .describe('dir', 'Directory to create the repository into')
    .string('dir')
    .nargs('dir', 1)
    .alias('dir', 'd')

    .describe('json', 'Export output to json')
    .boolean('json')

    .defaults({
      dir: 'repo',
      json: true
    })

    .help('help')
    .argv;

function isDirectory(repository) {
  return fs.lstatSync(repository).isDirectory();
}

function isGitDirectory(repository) {
  const gitRepo = `${repository}/HEAD`;

  try {
    return fs.lstatSync(gitRepo).isFile();
  } catch (e) {
    return false;
  }
}

exports.handler = argv => {
  fs.readdir(`./${argv.dir}`, (err, repos) => {
    if (err) {
      if (err.code === 'ENOENT') {
        console.log('[]');

        return;
      } else {
        throw err;
      }
    }

    const result = repos.reduce((output, repo) => {
      const repository = `./${argv.dir}/${repo}`;

      if (isDirectory(repository) && isGitDirectory(repository)) {
        output.push(argv.json ? buildInfo(repository, repo) : repository);
      }

      return output;
    }, []);

    console.log(JSON.stringify(result, null, ' '));
  });
};
