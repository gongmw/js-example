 /**
 * @description Common Logger Of CLI
 * @author MingWei Gong
 */

'use strict';
const boxen = require('boxen');
const chalk = require('chalk');

module.exports = {
  info: function (msg) {
    console.log('%s %s %s', `[${(new Date()).toUTCString()}]`, '[INFO]', msg);
  },
  ninfo: function (msg) {
    console.log(msg);
  },
  warn: function (msg) {
    console.log('%s %s %s', chalk.yellow(`[${(new Date()).toUTCString()}]`), chalk.yellow('[WARN]'), chalk.yellow(msg));
  },
  nwarn: function (msg) {
    console.log(chalk.yellow(msg));
  },
  success: function (msg) {
    console.log('%s %s %s', chalk.green(`[${(new Date()).toUTCString()}]`), chalk.green('[SUCCESS]'), chalk.green(msg));
  },
  nsuccess: function (msg) {
    console.log(chalk.green(msg));
  },
  error: function (msg) {
    if (msg instanceof Error) {
      console.log('%s %s %s', chalk.red(`[${(new Date()).toUTCString()}]`), chalk.red('[ERROR]'), chalk.red(msg.stack));
    } else {
      console.log('%s %s %s', chalk.red(`[${(new Date()).toUTCString()}]`), chalk.red('[ERROR]'), chalk.red(msg));
    }
  },
  nerror: function (msg) {
    if (msg instanceof Error) {
      console.log(chalk.red(msg.stack));
    } else {
      console.log(chalk.red(msg));
    }
  },
  boxen: function (msg) {
    console.log(boxen(msg, { padding: 1, borderStyle: 'double', borderColor: 'white' }));
  },
  endSpinner: function (msg) {
    return this;
  }
};
