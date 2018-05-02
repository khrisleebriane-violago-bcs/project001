@google
Feature: GoogleSearch

Background: 
    Given I go to google search page

@search
Scenario Outline: 
    When I search for <search>
    Then the search information will be written in a text file

    Examples:
    | search                             |
    | cake +chocolate +lemon -strawberry |
    | chicken +spicy +gravy -potato      |
    | boring                             |