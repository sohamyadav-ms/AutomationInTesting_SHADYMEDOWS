
import { Page } from '@playwright/test';




export const headerlocator = (page: Page) => page.getByRole('heading').first();

export const bookNowButton = (page: Page) => page.locator('a[href="#booking"]');

export const ourRoomsHeading = (page: Page) => page.locator('h2').first();

export const roomCardSuite = (page: Page) => page.locator('h5.card-title').filter({ hasText: 'Suite' });

export const suiteRoomCost = (page: Page) => page.locator('div.fw-bold.fs-5').nth(2);

export const suiteroomBookNowButton = (page: Page) => page.locator('.card').filter({ hasText: 'Suite' }).getByRole('link', { name: 'Book now' });

