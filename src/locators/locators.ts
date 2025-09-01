

import { Page } from '@playwright/test';
import * as data from '../data/testdata.json';

export const headerlocator = (page: Page) => page.getByRole('heading').first();

export const bookNowButton = (page: Page) => page.locator('a[href="#booking"]');

export const ourRoomsHeading = (page: Page) => page.locator('h2').first();

export const roomCardSuite = (page: Page) => page.locator('h5.card-title').filter({ hasText: 'Suite' });

export const suiteRoomCost = (page: Page) => page.locator('div.fw-bold.fs-5').nth(2);

export const suiteroomBookNowButton = (page: Page) => page.locator('.card').filter({ hasText: 'Suite' }).getByRole('link', { name: 'Book now' });

export const suitereservationheading = (page: Page) => page.getByRole('heading', { name: 'Suite Room' });

export const calendarContainer = (page: Page) => page.locator('.rbc-calendar');

export const calendarToolbarLabel = (page: Page) => page.locator('.rbc-toolbar-label');

export const startDate = (page: Page) => page.getByRole('button', { name: data.testData.startDate}).first();
  
export const endDate = (page: Page) =>  page.getByRole('button', { name: data.testData.endDate}).last();

export const noOfNights = (page: Page) => page.locator('div.d-flex.justify-content-between.mb-2 span').first();

export const totalAmount = (page: Page) => page.locator('div.d-flex.justify-content-between.fw-bold span').last();

export const reserveButton = (page: Page) => page.locator('#doReservation');

export const bookthisroom = (page: Page) => page.locator('h2').nth(3);

export const firstNameInput = (page: Page) => page.locator('input[name="firstname"]');

export const lastNameInput = (page: Page) => page.locator('input[name="lastname"]');

export const emailInput = (page: Page) => page.locator('input[name="email"]');

export const phoneInput = (page: Page) => page.locator('input[name="phone"]');

export const confirmReservationButton = (page: Page) => page.getByRole('button', { name: 'Reserve Now' });

export const reservationSuccessMessage = (page: Page) => page.locator('h2', { hasText: 'Booking Confirmed' });

export const errorMessage = (page: Page) => page.locator('div.alert.alert-danger ul li');

export const monthYearLable = (page: Page) => page.locator('span.rbc-toolbar-label');

export const conformationDate = (page: Page) => page.locator('p.text-center.pt-2 strong');