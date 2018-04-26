require('nightwatch-cucumber')({
  cucumberArgs: [
    '--require', './features/step_definitions',
    '--format', 'node_modules/cucumber-pretty',
    '--format', 'json:reports/cucumber.json',
    'features']
});

module.exports = {
  output_folder: './reports',
  page_objects_path : "./page-objects",
  custom_assertions_path: '',
  custom_commands_path : "./custom-commands",
  globals_path: "./globals.js",
  live_output: false,
  disable_colors: false,
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
      launch_url: 'https://devci.webjet.com.au/FlightSearch/',
      selenium_port: 4444,
      selenium_host: 'localhost',
      desiredCapabilities: {
        browserName: 'chrome',
        javascriptEnabled: true,
        chromeOptions: {
          args: ['incognito', 'start-maximized', 'disbale-gpu']
        }
      }
    },
    chrome: {
      desiredCapabilities: {
        browserName: 'chrome',
        javascriptEnabled: true,
        acceptSslCerts: true
      }
    }
  }
};