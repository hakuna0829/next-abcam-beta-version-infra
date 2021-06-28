@PDP @YETI-2296
Feature: Search suggest e2e tests

    @mobile
    Scenario Outline: Validating search suggest endpoint
        Given I am on the YETI homepage
        When I search for "<searchTerm>"
        Then I select the "<searchTerm>" option
        Examples:
            | searchTerm | category |
            | VEGF       | VEGF 164 |
