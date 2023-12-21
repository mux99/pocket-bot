import {expect, test} from "@playwright/test";
import { setAdminFromUsername, deleteUserByUsername, getTempPool, getLoggedCookiesByUsername, insertSession } from "../utils";
import * as crypto from 'crypto'

async function createUser(username, hashedPassword) {
	let query = await getTempPool().query({
		text: 'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING user_id',
		values: [username, hashedPassword]
	});

	await getTempPool().query({
		text: 'INSERT INTO users_roles (user_id, role_id) VALUES ($1, 1)',
		values: [query.rows[0].user_id]
	});

	return {
		user_id: query.rows[0].user_id
	};
}

const testCSSProperties = async (element, properties) => {
    for (const [property, value] of Object.entries(properties)) {
        await expect(element).toHaveCSS(property, value);
    }
};

const getComputedStyleProperty = async (element, property) => {
    return await element.evaluate((el, prop) =>
        window.getComputedStyle(el).getPropertyValue(prop),
        property
    );
};

test("Vérifiez si les propriétés CSS sont correctement définies", async ({ browser }) => {
    const username = crypto.randomUUID();
    await createUser(username, "test_password");
    await insertSession(username);
    const context = await browser.newContext();
    await context.addCookies([await getLoggedCookiesByUsername(username)]);
    const page = await context.newPage();
    await page.goto('/css-template');
    await expect(page.url().includes('/css-template')).not.toStrictEqual;
    await setAdminFromUsername(username);
    await page.goto('/css-template');
    await expect(page.url().includes('/css-template')).toStrictEqual;

    const title = page.locator('h1');
    const formDiv = page.locator('#formTest');
    const link = page.locator('a');
    const mainDiv = page.locator('#mainDiv');
    const greenButton = page.locator('#green-button');
    const redButton = page.locator('#red-button');
    const basicButton = page.locator('#basic-button');
    const basicInput = page.locator('input');

    const linkColor = await getComputedStyleProperty(link.nth(0), 'color');
    const greenButtonColor = await getComputedStyleProperty(greenButton, 'background-color');
    const redButtonColor = await getComputedStyleProperty(redButton, 'background-color');
    const basicButtonColor = await getComputedStyleProperty(basicButton, 'background-color');
    const divColor = await getComputedStyleProperty(mainDiv, 'background-color');
    const formColor = await getComputedStyleProperty(formDiv, 'background-color');
    const formBorderColor = await getComputedStyleProperty(formDiv, 'border-color');

    // Test title properties
    await testCSSProperties(title, {
        'font-weight': '700',
    });

    // Test div properties
    expect(divColor).toBe('rgb(0, 11, 29)');
    await testCSSProperties(mainDiv, {
        'text-align': 'center',
    });

    // Test form properties
    expect(formColor).toBe('rgb(31, 41, 55)');
    expect(formBorderColor).toBe('rgb(55, 65, 81)');

    // Test globalInput properties
    await testCSSProperties(basicInput, {
        'text-align': 'left',
        'cursor': 'text',
    });

    // Test button properties
    await testCSSProperties(basicButton, {
        'outline': 'rgb(255, 255, 255) none 0px',
        'border': '0px none rgb(255, 255, 255)',
        'font-family': 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
        'background-repeat': 'no-repeat',
        'cursor': 'pointer',
        'box-sizing': 'border-box',
    });
    expect(basicButtonColor).toBe('rgb(59, 130, 246)');

    // Test link properties
    expect(linkColor).toBe('rgb(255, 255, 255)');

    // Test green and red button color properties 
    expect(greenButtonColor).toBe('rgb(22, 163, 74)');
    expect(redButtonColor).toBe('rgb(220, 38, 38)');

    await deleteUserByUsername(username);
});
