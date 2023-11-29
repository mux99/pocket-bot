import {expect, test} from "@playwright/test";
import pkg from 'pg';
const {Pool} = pkg;


test("Check if footer's buttons are correctly set", async ({ browser }) => {
   const context = await browser.newContext();
   await context.addCookies([await getLoggedCookies()]);
   const page = await context.newPage();
   await page.goto('/');
   const playImage = page.getByTestId("footer-parts-div");
   const friendsImage = page.getByTestId("footer-friends-div");
   const profilImage = page.getByTestId("footer-profil-div");
   await expect(playImage).toBeVisible();
   await expect(friendsImage).toBeVisible();
   await expect(profilImage).toBeVisible();

   await page.goto('/parts/new');
   await expect(playImage).toHaveId('selected');
   await expect(friendsImage).not.toHaveId('selected');
   await expect(profilImage).not.toHaveId('selected');

   await page.goto('/friends');
   await expect(playImage).not.toHaveId('selected');
   await expect(friendsImage).toHaveId('selected');
   await expect(profilImage).not.toHaveId('selected');

   await page.goto('/profile');
   await expect(playImage).not.toHaveId('selected');
   await expect(friendsImage).not.toHaveId('selected');
   await expect(profilImage).toHaveId('selected');
});

async function getSessionUuid() {
   const pool = getTempPool();
   const {rows} = await pool.query({
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
      database: process.env.POSTGRES_DATABASE || 'postgres',
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
