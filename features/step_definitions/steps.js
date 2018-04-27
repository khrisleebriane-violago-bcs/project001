const {client} = require('nightwatch-cucumber');
const {Given, Then, When} = require('cucumber');
const searchPage = client.page.GoogleSearch();
const fs = require('fs');
var searchQuery;

Given(/^I go to google search page$/, async function() { 
  searchPage.navigate();
  await searchPage.waitForElementPresent('body', 60000);
});

When(/^I search for (.*)$/, async function(searchString) {
  searchQuery = searchString;
  searchPage.waitForElementVisible('@searchTextBox', 1000);
  await searchPage.setValue('@searchTextBox', [searchQuery, client.Keys.ENTER]);
});

Then(/^links from search results will be written in a text file$/, async function() {
  var resultsPage = client.page.SearchResults();
  resultsPage.waitForElementVisible('@aboutGoogle', 6000);
  var currentDate = new Date();
  var filename = 'SearchResults_' + searchQuery + '_' + currentDate.getMonth().toString() + '-' + currentDate.getDay().toString() + '-' + currentDate.getFullYear().toString() + '.txt';;
  await client.elements('css selector', 'div[class=g] h3 a',function (result) {
    for (var i = 0; i < result.value.length; i++) {
      client.elementIdAttribute(result.value[i].ELEMENT, 'href', function(attribute) {
        var data = attribute.value;
        data += '\n';
        fs.appendFile('./logs/' + filename, data, function (exception) {
          if (exception) 
            throw exception;
        });
      });
    }
  });
});