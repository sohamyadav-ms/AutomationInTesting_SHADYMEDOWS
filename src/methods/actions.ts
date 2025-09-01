
import { expect, Page } from '@playwright/test';
import * as locators from '../locators/locators';
import data from '../data/testdata.json';

let suiteCardTextGlobal: string | null = null;
let suitePriceGlobaal: string | null = null;
let noOfNightsGlobal: number | null = null;
let startDateGlobal: string | null = null;
let endDateGlobal: string | null = null;

export async function assertHeaderText(page: Page) {
    const headerLocator = locators.headerlocator(page);
    await expect(headerLocator).toHaveText(data.testData.header_text);
    const headerText = await headerLocator.textContent();
    console.log(headerText);
    return headerText;
}

export async function clickBookNow(page: Page) {
    const bookNow = locators.bookNowButton(page);
    await bookNow.click();
}

export async function validateOurRoomsHeading(page: Page) {
    const heading = locators.ourRoomsHeading(page);
    await expect(heading).toBeVisible();
    await expect(heading).toHaveText(data.testData.our_rooms_heading);
    const headerText = await heading.textContent();
    console.log(headerText);
    return headerText;
}

export async function bookRoomSuite(page: Page) {
    const suiteCard = locators.roomCardSuite(page);
    suiteCardTextGlobal = await suiteCard.textContent();
    await expect(suiteCard).toHaveText('Suite');
    const suiteCost = await locators.suiteRoomCost(page).textContent();
    const cost = suiteCost?.match(/\d+/)?.[0];
    suitePriceGlobaal = cost ?? null;
    await locators.suiteroomBookNowButton(page).click();
}

export async function validateSuiteReservationHeading(page: Page) {
    const heading = locators.suitereservationheading(page);
    await expect(heading).toBeVisible();
    await expect(heading).toHaveText(data.testData.suite_reservation_heading);
    const headerText = await heading.textContent();
    console.log(headerText);
    return headerText;
}

export async function validateReservationUrl(page: Page) {
    const currentUrl = page.url();
    console.log(currentUrl);
    await expect(page).toHaveURL(new RegExp(data.testData.reservationinUrl));
    return currentUrl;
}

export async function validateCardHeaderandReservationPageHeader(page: Page) {
    const heading = locators.suitereservationheading(page);
    const headingText = await heading.textContent();
    expect(headingText).toContain(suiteCardTextGlobal ?? '');
    console.log(suiteCardTextGlobal);
    console.log(headingText);
    return { suiteCardTextGlobal, headingText };
}

export async function validateCalendarDisplayed(page: Page) {
  await expect(locators.calendarContainer(page)).toBeVisible();
  await expect(locators.calendarToolbarLabel(page)).toBeVisible();
}

export async function SelectDates(page: Page) {

    const monthYear = (await locators.monthYearLable(page).textContent())!;
    const [monthName, year] = monthYear.trim().split(' ');

    const monthNumber = new Date(`${monthName} 1, ${year}`).getMonth() + 1;
    const month = monthNumber.toString().padStart(2, '0');

    const startDay = data.testData.startDate.padStart(2, "0");
    startDateGlobal = `${year}-${month}-${startDay}`;

    const endDay = data.testData.endDate.padStart(2, "0");
    endDateGlobal = `${year}-${month}-${endDay}`;

    console.log("Start Date:", startDateGlobal);
    console.log("End Date:", endDateGlobal);

    const startDate = await locators.startDate(page);
    const endDate = await locators.endDate(page);

    const startBox = await startDate.boundingBox();
    const endBox = await endDate.boundingBox();

    if (startBox && endBox) {
        
        const fromX = startBox.x + startBox.width / 2;
        const fromY = startBox.y + startBox.height / 2;
        const toX = endBox.x + endBox.width / 2;
        const toY = endBox.y + endBox.height / 2;

        
        await page.mouse.move(fromX, fromY);
        await page.mouse.down();
        await page.waitForTimeout(200); 
        await page.mouse.move(toX, toY, { steps: 20 });
        await page.mouse.up();
        await page.waitForTimeout(200); 
    } else {
        throw new Error(`Could not find start or end date buttons`);
    }

}

export async function extractNoOfNights(page: Page) {

    const nightsText = await locators.noOfNights(page).textContent();
    const noOfNights = nightsText?.match(/x\s+(\d+)\s+night/);
    const value = noOfNights ? parseInt(noOfNights[1], 10) : 0;
    noOfNightsGlobal = value;
    console.log(`Number of nights: ${value}`);
    return value;

}

export async function validateTotalBookingAmount(page: Page) {
    const amountOfDays = (suitePriceGlobaal && noOfNightsGlobal) ? (parseInt(suitePriceGlobaal, 10) * noOfNightsGlobal) : 0;
    const totalBookingAmount = amountOfDays+(Number(data.testData.cleaningFee) + Number(data.testData.serviceFee));
    console.log(`Expected Total Booking Amount: ${totalBookingAmount}`);
    const totalAmount = await locators.totalAmount(page).textContent();
    const amount = totalAmount?.replace(/[^\d]/g, '') ?? '0';
    console.log('Actual Total value:', amount);

    if (parseInt(amount, 10) === totalBookingAmount) {
        console.log('Total amount matches expected total', amount);
    } else {
        console.log('Mismatch! Expected:', totalBookingAmount, 'Found:', amount);
    }

    return { totalBookingAmount, amount };

}

export async function clickReserveNow(page: Page) {

    await locators.reserveButton(page).click();

}

export async function validateBookThisRoomHeading(page: Page) {
    await page.evaluate(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    const heading = locators.bookthisroom(page);
    await expect(heading).toBeVisible();
    await expect(heading).toHaveText(data.testData.bookthisroom);
    const headerText = await heading.textContent();
    console.log(headerText);
    return headerText;

}

export async function fillBookTheRoomForm(page: Page) {
    await page.waitForTimeout(100);
    await locators.firstNameInput(page).fill(data.testData.firstName);
    await page.waitForTimeout(100);
    await locators.lastNameInput(page).fill(data.testData.lastName);
    await page.waitForTimeout(100);
    await locators.emailInput(page).fill(data.testData.email);
    await page.waitForTimeout(100);
    await locators.phoneInput(page).fill(data.testData.phone);
    await page.waitForTimeout(500);
    
}

export async function clickConfirmReservation(page: Page) {
    await locators.confirmReservationButton(page).click();
    await page.waitForTimeout(5000);
}

export async function validateReservationSuccessMessage(page: Page) {
   
    await page.evaluate(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    await page.waitForTimeout(500);
    const message = locators.reservationSuccessMessage(page);
    await expect(message).toBeVisible();
    await expect(message).toHaveText(data.testData.reservationSuccessMessage);
    const messageText = await message.textContent();
    await page.waitForTimeout(100);
    console.log(messageText);
    return messageText;

}

export async function validateAllFieldsBlankErrorMessage(page: Page) {

    const errorMessages = await locators.errorMessage(page).allTextContents();
    console.log('Actual Error Messages:', errorMessages);
    console.log('Expected Error Messages:', data.allblankfieldserror);
    expect(errorMessages.sort()).toEqual(data.allblankfieldserror.sort());
    return errorMessages;

};

export async function validateFirstNameFieldErrorMessage(page: Page) {

    await page.waitForTimeout(100);
    await locators.firstNameInput(page).fill(data.firstNameError.invalidFName);
    await page.waitForTimeout(100);
    await locators.lastNameInput(page).fill(data.testData.lastName);
    await page.waitForTimeout(100);
    await locators.emailInput(page).fill(data.testData.email);
    await page.waitForTimeout(100);
    await locators.phoneInput(page).fill(data.testData.phone);
    await page.waitForTimeout(500);


    await locators.confirmReservationButton(page).click();
    await page.waitForTimeout(1000);


    const errorMessages = await locators.errorMessage(page).allTextContents();
    console.log('Actual Error Messages:', errorMessages);
    console.log('Expected Error Messages:', data.firstNameError.error);
    expect(errorMessages).toEqual(data.firstNameError.error);
    return errorMessages;

};

export async function validateLastNameFieldErrorMessage(page: Page) {

    await page.waitForTimeout(100);
    await locators.firstNameInput(page).fill(data.testData.firstName);
    await page.waitForTimeout(100);
    await locators.lastNameInput(page).fill(data.lastNameError.invalidLName);
    await page.waitForTimeout(100);
    await locators.emailInput(page).fill(data.testData.email);
    await page.waitForTimeout(100);
    await locators.phoneInput(page).fill(data.testData.phone);
    await page.waitForTimeout(500);


    await locators.confirmReservationButton(page).click();
    await page.waitForTimeout(1000);


    const errorMessages = await locators.errorMessage(page).allTextContents();
    console.log('Actual Error Messages:', errorMessages);
    console.log('Expected Error Messages:', data.lastNameError.error);
    expect(errorMessages).toEqual(data.lastNameError.error);
    return errorMessages;

};

export async function validateEmailFieldErrorMessage(page: Page) {

    await page.waitForTimeout(100);
    await locators.firstNameInput(page).fill(data.testData.firstName);
    await page.waitForTimeout(100);
    await locators.lastNameInput(page).fill(data.testData.lastName);
    await page.waitForTimeout(100);
    await locators.emailInput(page).fill(data.emailError.invalidEmail);
    await page.waitForTimeout(100);
    await locators.phoneInput(page).fill(data.testData.phone);
    await page.waitForTimeout(500);


    await locators.confirmReservationButton(page).click();
    await page.waitForTimeout(1000);


    const errorMessages = await locators.errorMessage(page).allTextContents();
    console.log('Actual Error Messages:', errorMessages);
    console.log('Expected Error Messages:', data.emailError.error);
    expect(errorMessages).toEqual(data.emailError.error);
    return errorMessages;

};


export async function validatePhoneFieldErrorMessage(page: Page) {

    await page.waitForTimeout(100);
    await locators.firstNameInput(page).fill(data.testData.firstName);
    await page.waitForTimeout(100);
    await locators.lastNameInput(page).fill(data.testData.lastName);
    await page.waitForTimeout(100);
    await locators.emailInput(page).fill(data.testData.email);
    await page.waitForTimeout(100);
    await locators.phoneInput(page).fill(data.phoneError.invalidPhone);
    await page.waitForTimeout(500);


    await locators.confirmReservationButton(page).click();
    await page.waitForTimeout(1000);


    const errorMessages = await locators.errorMessage(page).allTextContents();
    console.log('Actual Error Messages:', errorMessages);
    console.log('Expected Error Messages:', data.phoneError.error);
    expect(errorMessages).toEqual(data.phoneError.error);
    return errorMessages;

};

export async function validateReservationDate(page: Page) {
   
    const bookedDate = locators.conformationDate(page);
    const bookingDateText = (await bookedDate.textContent())?.trim() || '';
    console.log(`Booking Date Range: ${bookingDateText}`);

    const [startDate, endDate] = bookingDateText.split(' - ').map(date => date.trim());
    console.log(`Start Date Confirmed: ${startDate}`);
    console.log(`End Date Confirmed: ${endDate}`);

    console.log(`Start Date Selected: ${startDateGlobal}`);
    console.log(`End Date Selected: ${endDateGlobal}`);

    expect(startDate).toBe(startDateGlobal);
    expect(endDate).toBe(endDateGlobal);

    return { startDate, endDate };
}