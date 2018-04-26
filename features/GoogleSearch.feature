Feature: GoogleSearch

Background: 
    Given I go to google search page

Scenario Outline: GoogleSearch
    When I search for <search>

    Examples:
    | search       |
    | Kingdom      |
    | Black Clover |
    | Family Guy   |
