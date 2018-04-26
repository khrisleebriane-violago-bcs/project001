require('nightwatch-cucumber')({
  cucumberArgs: [
    '--format', 'node_modules/cucumber-pretty',
    'features'
  ]
});

module.exports = {
  output_folder: './reports',
  page_objects_path : "./page_objects",
  custom_assertions_path: '',
  custom_commands_path : "./custom_commands",
  globals_path: "",
  live_output: false,
  disable_colors: false,
  test_workers: false,
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
      screenshots: {
        enabled: true,
        onfailure: true,
        path: './screenshots'
      },
      selenium_port: 4444,
      selenium_host: 'localhost',
      desiredCapabilities: {
        browserName: 'chrome',
        javascriptEnabled: true,
        acceptSslCerts: true,
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