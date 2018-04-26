const {client} = require('nightwatch-cucumber');
const {Given, Then, When} = require('cucumber');
const searchPage = client.page.GoogleSearch();

Given(/^I go to google search page$/, async () => { 
  searchPage.navigate();
  await searchPage.waitForElementPresent('body', 60000);
});

When(/^I search for (.*)$/, (searchString) => {
  searchPage.waitForElementVisible('@searchTextBox', 1000);    
  return searchPage.setValue('@searchTextBox', [searchString, client.keys.ENTER]);
});

