const {client} = require('nightwatch-cucumber');
const {Given, Then, When} = require('cucumber');
const searchPage = client.page.GoogleSearch();
const fs = require('fs');
var SearchQueryObject = require('../../classes/SearchQueryObject.js');
var searchQuery;

Given(/^I go to google search page$/, function() { 
  searchPage.navigate();
  return searchPage.waitForElementPresent('body', 60000);
});

When(/^I search for (.*)$/, function(searchString) {
  searchQuery = new SearchQueryObject(searchString);
  searchPage.waitForElementVisible('@searchTextBox', 1000);
  return searchPage.setValue('@searchTextBox', [searchQuery.content, client.Keys.ENTER]);
});

Then(/^the search information will be written in a text file$/, function() {
  var resultsPage = client.page.SearchResults();
  var handler = {
    get: function(target, name) {
      if (target[name] == null) {
        return [];
      }
      return target[name];
    }
  };
  var proxySearchQuery = new Proxy(searchQuery, handler);
  resultsPage.waitForElementVisible('@resultStats', 10000);
  // return client.elements('css selector', 'div[class=g] h3 a',function (result) {
  //   var data = '';
  //   for (var i = 0; i < result.value.length; i++) {
  //     client.elementIdAttribute(result.value[i].ELEMENT, 'href', function(attribute) {
  //       data += attribute.value;
  //       data += '\n';
  //       fs.appendFile('./logs/' + filename + '.txt', data, function (exception) {
  //         if (exception) 
  //           throw exception;
  //       });
  //     });
  //   }
  // });
  var data = 'Content: ' + proxySearchQuery.content + '\n';
  data += 'Includes: ';
  if (proxySearchQuery.includes.length > 0) {
    for (var i = 0; i < 2; i++) {
      data += (proxySearchQuery.includes[i]);
      if (i != proxySearchQuery.includes.length - 1) {
        data += ', ';
      }
    }  
  }
  data += '\n';
  data += 'Excludes: ';
  if (proxySearchQuery.excludes.length > 0) {
    for (var i = 0; i < proxySearchQuery.excludes.length; i++) {
      data += (proxySearchQuery.excludes[i]);
      if (i != proxySearchQuery.excludes.length - 1) {
        data += ', ';
      }
    }  
  }  
  var currentDate = new Date();
  var filename = 'SearchQueryLog' +
    '_' +
    currentDate.getMonth().toString() + 
    '-' + 
    currentDate.getDay().toString() + 
    '-' + 
    currentDate.getFullYear().toString() + 
    '_' + 
    currentDate.getTime().toString();
  fs.writeFile('./logs/' + filename + '.txt', data, function (exception) {
    if (exception) 
      throw exception;
  });
});
