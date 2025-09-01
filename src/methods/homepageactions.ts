
import { expect, Page } from '@playwright/test';
import * as homepagelocators from '../locators/homepagelocators';
import data from '../data/testdata.json';


export let suiteCardTextGlobal: string | null = null;
export let suitePriceGlobaal: string | null = null;


export async function assertHeaderText(page: Page) {
    const headerLocator = homepagelocators.headerlocator(page);
    await expect(headerLocator).toHaveText(data.testData.header_text);
    const headerText = await headerLocator.textContent();
    console.log(`The Page Heading is: ${headerText}`);
    return headerText;
}

export async function clickBookNow(page: Page) {
    const bookNow = homepagelocators.bookNowButton(page);
    await bookNow.click();
}

export async function validateOurRoomsHeading(page: Page) {
    const heading = homepagelocators.ourRoomsHeading(page);
    await expect(heading).toBeVisible();
    await expect(heading).toHaveText(data.testData.our_rooms_heading);
    const headerText = await heading.textContent();
    console.log(`The Rooms section Heading is: ${headerText}`);
    return headerText;
}

export async function bookRoomSuite(page: Page) {
    const suiteCard = homepagelocators.roomCardSuite(page);
    suiteCardTextGlobal = await suiteCard.textContent();
    await expect(suiteCard).toHaveText('Suite');
    const suiteCost = await homepagelocators.suiteRoomCost(page).textContent();
    const cost = suiteCost?.match(/\d+/)?.[0];
    suitePriceGlobaal = cost ?? null;
    await homepagelocators.suiteroomBookNowButton(page).click();
}

