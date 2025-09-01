Problem Statement / Task:

Create a playwright test/(s) to cover following user steps:

1. User opens https://automationintesting.online/
2. User clicks on `Book Now` button placed on a hero (top of a page)
3. User chooses one of room type and clicks on `Book Now` button related to specific cart.
4. User is able to see a reservation page \
   Required checks here:
   - check if page URL contains `/reservation`
   - check if page displays correct header (regarding which room option you have chosen)
   - check if calendar has been successfully displayed
5. User selects specific amount of days on calendar
   Required checks here:
   - check if amount displayed in `Price Summary` section is correct ( should be equal number of selected days \* price per night)
6. User clicks on `Reserve Now` button \
7. User fills a `Book This Room` form and clicks on "Reserve Now" button \
   Required checks here:   - check if form validation works as expected. 

8. User is able to see `Booking Confirmed` section.
9. Displayed dates should cover same time period that has been previously chosen by user.


-------------------------------------------------------------------------------------------------------------------------------------------------



Solution Summary:

For this task, I have used PlayWright tool and TypeScript programming language to develope an automation framework along with VSCode as the IDE for development. The framework is designed using a Page-Object approach where all the files are created seperately based on specific paged in the application being tested. Also those files are divide further into Locators, Methods/Actions which consume locators and data, TestCase file that consumes Methods/ Actions. Data-Driven approach is also used where all the data is store in a JSON file which acts as a data provider throughout the framework. The Locator files contains all the web elements. The Methods or Actions files contains all the actions that the simulates what user will perform in the form of TypeScript methods. The Test file contains all the test cases which are automated. The Data JSON file containes all data and messages required for validation. I have integrated Allure reports, which can be cusomized to get a detailed report (future scope). Made use of GitHub Copilot to efficiently and optimal issues and error resolution while developing this framework. The test cases developed in this automation framework covers positive flows as well as validate error messages. The configuration file is configured for series execution of test cases and chrome browser. This framework hage as huge scope of scalability.



Solution Highlights:

1. Developed PlayWright Project
2. Used TypeScript along with Page-Object and Data-driven Approach
3. Allure and PlayWright Report for detail reporting
4. GitHub Copilot for optimal error resolution



Details of Tools and Technologies used for this Framework:

1. TypeScript - Coding Language.
2. PlayWright tool - For automation.
3. Page-Object approach - Locators, Methods/Actions, Test files are created seperately based on the pages, homepage, reservationpage.
4. Data Driven approach - Test Data is stored in JSON file and used dynamically.
5. Allure Report - To generate a detailed HTML report has a huge future scope to log every action. (allure-results)



List of all the test cases automated:

1. User enters the website and Validated Application Header Text
2. User clicks Book Now button on home page and validates Our Room Heading
3. User books a Suite room and validates the Reservation Page
4. Validations of Suite room reservation page, Reservation URL, Booking Room Title and If Calander is Displayed
5. Select days in the calander and validate booking amount and clicks on Reserve Now button
6. Validate Book The Room form for all blank field error message
7. Validate Book The Room form for invalid First Name field error message
8. Validate Book The Room form for invalid Last Name field error message
9. Validate Book The Room form for invalid Email field error message
10. Validate Book The Room form for invalid Phone field error message
11. Fill Book The Room form and click Reserve Now and validate booking confirmed date
