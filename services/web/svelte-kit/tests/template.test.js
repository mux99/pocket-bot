import { expect, test } from "@playwright/test";
import pkg from 'pg';
const { Pool } = pkg;

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
    const context = await browser.newContext();
    await context.addCookies([await getLoggedCookies()]);
    const page = await context.newPage();
    await page.goto('/css-template');

    const title = page.locator('h1');
    const secondTitle = page.locator('h2');
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
    const inputColor = await getComputedStyleProperty(basicInput, 'background-color');

    // Test title properties
    await testCSSProperties(title, {
        'font-size': '30px',
        'line-height': '36px',
        'font-weight': '700',
    });

    // Test h2 title properties
    await testCSSProperties(secondTitle, {
        'font-size': '24px',
        'line-height': '28px',
    });

    // Test div properties
    expect(divColor).toBe('rgb(0, 11, 29)');
    await testCSSProperties(mainDiv, {
        'text-align': 'center',
    });

    // Test form properties
    expect(formColor).toBe('rgb(31, 41, 55)');
    expect(formBorderColor).toBe('rgb(55, 65, 81)');
    await testCSSProperties(formDiv, {
        'border-radius': '8px',
        'padding': '15px',
    });

    // Test globalInput properties
    await testCSSProperties(basicInput, {
        'margin': '5px',
        'text-align': 'left',
        'cursor': 'text',
        'border-radius': '8px',
        'height': '40px',
    });

    // Test button properties
    await testCSSProperties(basicButton, {
        'height': '35px',
        'border-radius': '17.5px',
        'margin': '5px',
        'outline': 'rgb(255, 255, 255) none 0px',
        'border': '0px none rgb(255, 255, 255)',
        'font-family': 'ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", sans-serif',
        'padding': '0px 15px',
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
});

async function getSessionUuid() {
    const pool = getTempPool();
    const { rows } = await pool.query({
        text: 'SELECT uuid FROM sessions WHERE expires_at > CURRENT_TIMESTAMP;',
        values: []
    });
    pool.end();
    return rows[0].uuid;
}

function getTempPool() {
    return new Pool({
        host: process.env.POSTGRES_HOST || 'localhost',
        port: process.env.POSTGRES_PORT || 5432,
        database: process.env.POSTGRES_DATABASE || 'pocketbot',
        user: process.env.POSTGRES_USER || 'postgres',
        password: process.env.POSTGRES_PASSWORD || 'postgres'
    });
}

async function getLoggedCookies() {
    const sessionUuid = await getSessionUuid();
    return {
        name: 'uuid',
        value: sessionUuid,
        domain: 'localhost',
        path: '/',
        expires: -1
    };
}
