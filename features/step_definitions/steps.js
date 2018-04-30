const {client} = require('nightwatch-cucumber');
const {Given, Then, When} = require('cucumber');
const searchPage = client.page.GoogleSearch();
const fs = require('fs');
var searchQuery;

Given(/^I go to google search page$/, function() { 
  searchPage.navigate();
  return searchPage.waitForElementPresent('body', 60000);
});

When(/^I search for (.*)$/, function(searchString) {
  searchQuery = searchString;
  searchPage.waitForElementVisible('@searchTextBox', 1000);
  return searchPage.setValue('@searchTextBox', [searchQuery, client.Keys.ENTER]);
});

Then(/^links from search results will be written in a text file$/, function() {
  var resultsPage = client.page.SearchResults();
  resultsPage.waitForElementVisible('@resultStats', 10000);
  var currentDate = new Date();
  var filename = 'SearchResults_' + searchQuery + '_' + currentDate.getMonth().toString() + '-' + currentDate.getDay().toString() + '-' + currentDate.getFullYear().toString();
  return client.elements('css selector', 'div[class=g] h3 a',function (result) {
    var data = '';
    for (var i = 0; i < result.value.length; i++) {
      client.elementIdAttribute(result.value[i].ELEMENT, 'href', function(attribute) {
        data += attribute.value;
        data += '\n';
        fs.appendFile('./logs/' + filename + '.txt', data, function (exception) {
          if (exception) 
            throw exception;
        });
      });
    }
  });
});
