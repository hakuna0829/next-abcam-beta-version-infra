@PDP @YETI-2103
Feature: Product Detail Page

    @desktop
    Scenario: Land on PDP paage directly and assert Product Details
        Given I am on the PDP page for "ab189494"
        And I should see product name "ab189494" in url
        And I assert on product details:
            | IMMUNOGEN   | Recombinant fragment within Mouse SIRT1 aa 200-500 |
            | CONJUGATION | Unconjugated                                       |
        When I select "datasheet" section
        And I should see "datasheet" section
        And I should see Download Datasheet section
