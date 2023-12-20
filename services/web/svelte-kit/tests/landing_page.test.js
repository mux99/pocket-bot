import {expect, test} from "@playwright/test";

test("Test page accueil", async ({browser}) => {

    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('/')
    const button = page.getByTestId("show_rule_button");
    await expect(button).toHaveText(/Show Rules/);
    await button.click();
    await expect(button).toHaveText(/Hide Rules/);

});