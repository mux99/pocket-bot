import {expect, test} from "@playwright/test";
import pkg from 'pg';
import {getLoggedCookies, insertSession, deleteUserByUsername, getTempPool} from "../utils";
import * as crypto from 'crypto';
import { url } from "inspector";
const {Pool} = pkg;

async function createUser(username, hashedPassword) {
    let query = null;

    query = await getTempPool().query({
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

test("Footer visibility based on user authentication status and page", async ({ browser }) => {
    const username = crypto.randomUUID();
    await createUser(username, 'testpassword');
    await insertSession(username);
    const context = await browser.newContext();
    await context.addCookies([await getLoggedCookies(username)]);
    const page = await context.newPage();

    await page.goto('/');
    const playImage = page.getByTestId("footer-parts-div");
    await expect(playImage).toBeVisible();
    
 
    await page.goto('/login'); 
    await page.waitForSelector('footer');
  

    await page.goto('/register');
    await page.waitForSelector('footer');


    await deleteUserByUsername(username);
  });

