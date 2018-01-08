const isString = require('lodash/isString');
const config = require('../../gulp/config/gulp.conf');
const args = require('./args-parser');

const NIGHTWATCH_PATH = config.dirs.nightwatch.root;
const REPORT_PATH = config.dirs.report;

module.exports = {
  src_folders: [config.dirs.browserTests.smoke],
  output_folder: REPORT_PATH,
  custom_commands_path: '',
  custom_assertions_path: '',
  page_objects_path: `${NIGHTWATCH_PATH}/page-objects`,
  globals_path: '',
  selenium: {
    start_process: true,
    server_path: require('selenium-server').path,
    log_path: REPORT_PATH,
    host: '127.0.0.1',
    port: 4444,
    cli_args: {
      'webdriver.chrome.driver': require('chromedriver').path
    }
  },

  test_settings: {
    default: {
      selenium_port: 4444,
      selenium_host: '127.0.0.1',
      silent: true,
      screenshots: {
        enabled: true,
        on_failure: true,
        path: REPORT_PATH
      },
      desiredCapabilities: {
        browserName: 'chrome',
        acceptSslCerts: true,
        chromeOptions: {
          args: ['--window-size=1400,1024', '--no-sandbox', '--user-agent=seed-project/nightwatch.js/chrome'],
        },
      },
      globals: {
        asyncHookTimeout: 30000,
        baseUrl: 'https://jba-web.brighter.io:8081',
        skylightUrl: 'https://stable.brighter.io',
        login: {
          username: isString(args.username) ? args.username : 'as-guardians@salesforce.com',
          password: isString(args.password) ? args.password : '1',
        },
      }
    },

    unstable: {
      globals: {
        baseUrl: 'https://unstable-setup-hub.brighter.io',
        skylightUrl: 'https://unstable.brighter.io',
      }
    },

    stable: {
      globals: {
        baseUrl: 'https://stable-setup-hub.brighter.io',
        skylightUrl: 'https://stable.brighter.io',
      }
    },

    stage: {
      globals: {
        baseUrl: 'https://stage-setup-hub.social.com',
        skylightUrl: 'https://stage.social.com',
      }
    },

    prod: {
      globals: {
        baseUrl: 'https://setup-hub.social.com',
        skylightUrl: 'https://app.social.com',
      }
    }
  }
};
