const exec = require('child_process').exec;

/* eslint-disable no-console */

module.exports = (cmd, callback = () => {}) =>
  exec(cmd, (err, stdout, stderr) => {
    if (err) {
      console.error(err);
    } else if (stderr) {
      console.error(stderr);
    } else {
      console.log(stdout);
    }

    callback(err, stdout, stderr);
  });
