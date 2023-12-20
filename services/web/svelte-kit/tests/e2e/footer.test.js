import {expect, test} from "@playwright/test";
import { getLoggedCookies } from '../utils.js';

test("Check if footer's buttons are correctly set", async ({ browser }) => {
   const context = await browser.newContext();
   await context.addCookies([await getLoggedCookies()]);
   const page = await context.newPage();
   await page.goto('/');
   const playImage = page.getByTestId("footer-parts-div");
   const friendsImage = page.getByTestId("footer-friends-div");
   const profileImage = page.getByTestId("footer-profile-div");
   await expect(playImage).toBeVisible();
   await expect(friendsImage).toBeVisible();
   await expect(profileImage).toBeVisible();

   await page.goto('/parts/new');
   await expect(playImage).toHaveId('selected');
   await expect(friendsImage).not.toHaveId('selected');
   await expect(profileImage).not.toHaveId('selected');

   await page.goto('/friend');
   await expect(playImage).not.toHaveId('selected');
   await expect(friendsImage).toHaveId('selected');
   await expect(profileImage).not.toHaveId('selected');

   await page.goto('/profile');
   await expect(playImage).not.toHaveId('selected');
   await expect(friendsImage).not.toHaveId('selected');
   await expect(profileImage).toHaveId('selected');
});
