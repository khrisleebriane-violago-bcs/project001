require('nightwatch-cucumber')({
  cucumberArgs: [
    '--format', 'node_modules/cucumber-pretty',
    '--format', 'json:reports/cucumber.json',
    'features'
  ]
});

module.exports = {
  /* File paths */
  custom_assertions_path: '',
  custom_commands_path : "./custom_commands",
  globals_path: "./globals.js",
  output_folder: './reports',
  page_objects_path : "./page_objects",

  /* Others */
  detailed_output: false,
  disable_colors: false,
  live_output: true,
  test_workers: {
    enabled: true
  },
  selenium: {
    start_process: true,
    server_path: './bin/selenium-server-standalone-3.9.1.jar',
    log_path: '',
    port: 4444,
    cli_args : {
      "webdriver.chrome.driver" : "./bin/chromedriver.exe"
    }
  },
  test_settings: {
    default: {
      default_path_prefix: '',
      desiredCapabilities: {
        browserName: 'chrome',
        javascriptEnabled: true,
        acceptSslCerts: true,
        chromeOptions: {
          args: ['incognito', 'start-maximized', 'disable-gpu', '--no-sandbox']
        }
      },
      launch_url: '',
      screenshots: {
        enabled: true,
        onfailure: true,
        on_error : true,
        path: './screenshots'
      },
      //selenium_port: 4444,
      selenium_port: 9515,
      selenium_host: 'localhost',
    },
    headless: {
      desiredCapabilities: {
        browserName: 'chrome',
        javascriptEnabled: true,
        acceptSslCerts: true,
        chromeOptions: {
          args: ["disable-web-security", "ignore-certificate-errors", "headless"]
        }
      }
    }
  }
};