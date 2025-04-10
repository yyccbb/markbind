const path = require('path');

const { Site } = require('@markbind/core');

const cliUtil = require('../util/cliUtil');
const logger = require('../util/logger');

const _ = {};
_.isBoolean = require('lodash/isBoolean');

function build(userSpecifiedRoot, output, options) {
  // if --baseUrl contains no arguments (options.baseUrl === true) then set baseUrl to empty string
  const baseUrl = _.isBoolean(options.baseUrl) ? '' : options.baseUrl;

  let rootFolder;
  try {
    rootFolder = cliUtil.findRootFolder(userSpecifiedRoot, options.siteConfig);
  } catch (error) {
    logger.error(error.message);
    logger.error('This directory does not appear to contain a valid MarkBind site. '
              + 'Check that you are running the command in the correct directory!\n'
              + '\n'
              + 'To create a new MarkBind site, run:\n'
              + '   markbind init');
    process.exitCode = 1;
    process.exit();
  }

  const defaultOutputRoot = path.join(rootFolder, '_site');
  const outputFolder = output ? path.resolve(process.cwd(), output) : defaultOutputRoot;
  new Site(rootFolder, outputFolder, undefined, undefined, options.siteConfig)
    .generate(baseUrl)
    .then(() => {
      logger.info('Build success!');
    })
    .catch((error) => {
      logger.error(error.message);
      process.exitCode = 1;
    });
}

module.exports = {
  build,
};
