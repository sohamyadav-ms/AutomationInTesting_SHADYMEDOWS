
import { test } from '@playwright/test';
import * as homepageactions from '../src/methods/homepageactions';
import * as reservationpageactions from '../src/methods/reservationpageactions';


test('User enters the website', async ({ page }) => {
    await page.goto('/');
    await homepageactions.assertHeaderText(page);
});


test('User clicks Book Now button on hero', async ({ page }) => {
    await page.goto('/');
    await homepageactions.clickBookNow(page);
    await homepageactions.validateOurRoomsHeading(page);
});


test('User books a Suite room and sees reservation page', async ({ page }) => {
    await page.goto('/');
    await homepageactions.clickBookNow(page);
    await homepageactions.bookRoomSuite(page);
    await reservationpageactions.validateSuiteReservationHeading(page);
});


test('Validations of Suite reservation page', async ({ page }) => {
    await page.goto('/');
    await homepageactions.clickBookNow(page);
    await homepageactions.bookRoomSuite(page);


    await reservationpageactions.validateReservationUrl(page);


    await reservationpageactions.validateCardHeaderandReservationPageHeader(page);


    await reservationpageactions.validateCalendarDisplayed(page);
});


test('Select days in the calander and validate booking amount and clicks on Reserve Now button', async ({ page }) => {
    await page.goto('/');
    await homepageactions.clickBookNow(page);
    await homepageactions.bookRoomSuite(page);

    await reservationpageactions.SelectDates(page);

    await reservationpageactions.extractNoOfNights(page);

    await reservationpageactions.validateTotalBookingAmount(page);

    await reservationpageactions.clickReserveNow(page);

    await reservationpageactions.validateBookThisRoomHeading(page);

});


test('Validate Book The Room form for all blank field error message', async ({ page }) => {

    await page.goto('/');
    await homepageactions.clickBookNow(page);
    await homepageactions.bookRoomSuite(page);
    await reservationpageactions.SelectDates(page);
    await reservationpageactions.clickReserveNow(page);
    await reservationpageactions.clickConfirmReservation(page);


    await reservationpageactions.validateAllFieldsBlankErrorMessage(page);

});


test('Validate Book The Room form for invalid First Name field error message', async ({ page }) => {

    await page.goto('/');
    await homepageactions.clickBookNow(page);
    await homepageactions.bookRoomSuite(page);
    await reservationpageactions.SelectDates(page);
    await reservationpageactions.clickReserveNow(page);


    await reservationpageactions.validateFirstNameFieldErrorMessage(page);

});


test('Validate Book The Room form for invalid Last Name field error message', async ({ page }) => {

    await page.goto('/');
    await homepageactions.clickBookNow(page);
    await homepageactions.bookRoomSuite(page);
    await reservationpageactions.SelectDates(page);
    await reservationpageactions.clickReserveNow(page);

    
    await reservationpageactions.validateLastNameFieldErrorMessage(page);

});


test('Validate Book The Room form for invalid Email field error message', async ({ page }) => {

    await page.goto('/');
    await homepageactions.clickBookNow(page);
    await homepageactions.bookRoomSuite(page);
    await reservationpageactions.SelectDates(page);
    await reservationpageactions.clickReserveNow(page);

    
    await reservationpageactions.validateEmailFieldErrorMessage(page);

});


test('Validate Book The Room form for invalid Phone field error message', async ({ page }) => {

    await page.goto('/');
    await homepageactions.clickBookNow(page);
    await homepageactions.bookRoomSuite(page);
    await reservationpageactions.SelectDates(page);
    await reservationpageactions.clickReserveNow(page);

    
    await reservationpageactions.validatePhoneFieldErrorMessage(page);

});


test('Fill Book The Room form and click Reserve Now and validate booking confirmed date', async ({ page }) => {
    await page.goto('/');
    await homepageactions.clickBookNow(page);
    await homepageactions.bookRoomSuite(page);

    await reservationpageactions.SelectDates(page);

    await reservationpageactions.clickReserveNow(page);

    await reservationpageactions.validateBookThisRoomHeading(page);

    await reservationpageactions.fillBookTheRoomForm(page);

    await reservationpageactions.clickConfirmReservation(page);

    await reservationpageactions.validateReservationSuccessMessage(page);

});