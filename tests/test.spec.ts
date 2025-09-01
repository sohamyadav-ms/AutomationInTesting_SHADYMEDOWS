
import { test } from '@playwright/test';
import * as actions from '../src/methods/actions';


test('User enters the website', async ({ page }) => {
    await page.goto('/');
    await actions.assertHeaderText(page);
});


test('User clicks Book Now button on hero', async ({ page }) => {
    await page.goto('/');
    await actions.clickBookNow(page);
    await actions.validateOurRoomsHeading(page);
});


test('User books a Suite room and sees reservation page', async ({ page }) => {
    await page.goto('/');
    await actions.clickBookNow(page);
    await actions.bookRoomSuite(page);
    await actions.validateSuiteReservationHeading(page);
});


test('Validations of Suite reservation page', async ({ page }) => {
    await page.goto('/');
    await actions.clickBookNow(page);
    await actions.bookRoomSuite(page);


    await actions.validateReservationUrl(page);


    await actions.validateCardHeaderandReservationPageHeader(page);


    await actions.validateCalendarDisplayed(page);
});


test('Select days in the calander and validate booking amount and clicks on Reserve Now button', async ({ page }) => {
    await page.goto('/');
    await actions.clickBookNow(page);
    await actions.bookRoomSuite(page);

    await actions.SelectDates(page);

    await actions.extractNoOfNights(page);

    await actions.validateTotalBookingAmount(page);

    await actions.clickReserveNow(page);

    await actions.validateBookThisRoomHeading(page);

});


test('Validate Book The Room form for all blank field error message', async ({ page }) => {

    await page.goto('/');
    await actions.clickBookNow(page);
    await actions.bookRoomSuite(page);
    await actions.SelectDates(page);
    await actions.clickReserveNow(page);
    await actions.clickConfirmReservation(page);


    await actions.validateAllFieldsBlankErrorMessage(page);

});


test('Validate Book The Room form for invalid First Name field error message', async ({ page }) => {

    await page.goto('/');
    await actions.clickBookNow(page);
    await actions.bookRoomSuite(page);
    await actions.SelectDates(page);
    await actions.clickReserveNow(page);


    await actions.validateFirstNameFieldErrorMessage(page);

});


test('Validate Book The Room form for invalid Last Name field error message', async ({ page }) => {

    await page.goto('/');
    await actions.clickBookNow(page);
    await actions.bookRoomSuite(page);
    await actions.SelectDates(page);
    await actions.clickReserveNow(page);

    
    await actions.validateLastNameFieldErrorMessage(page);

});


test('Validate Book The Room form for invalid Email field error message', async ({ page }) => {

    await page.goto('/');
    await actions.clickBookNow(page);
    await actions.bookRoomSuite(page);
    await actions.SelectDates(page);
    await actions.clickReserveNow(page);

    
    await actions.validateEmailFieldErrorMessage(page);

});


test('Validate Book The Room form for invalid Phone field error message', async ({ page }) => {

    await page.goto('/');
    await actions.clickBookNow(page);
    await actions.bookRoomSuite(page);
    await actions.SelectDates(page);
    await actions.clickReserveNow(page);

    
    await actions.validatePhoneFieldErrorMessage(page);

});


test('Fill Book The Room form and click Reserve Now and validate booking confirmed date', async ({ page }) => {
    await page.goto('/');
    await actions.clickBookNow(page);
    await actions.bookRoomSuite(page);

    await actions.SelectDates(page);

    await actions.clickReserveNow(page);

    await actions.validateBookThisRoomHeading(page);

    await actions.fillBookTheRoomForm(page);

    await actions.clickConfirmReservation(page);

    await actions.validateReservationSuccessMessage(page);

});