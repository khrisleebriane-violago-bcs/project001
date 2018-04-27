Feature: GoogleSearch

Background: 
    Given I go to google search page

Scenario Outline: 
    When I search for <search>
    Then links from search results will be written in a text file

    Examples:
    | search              |
    | nightwatch          |
    | cucumber.io         |
    | nightwatch-cucumber |