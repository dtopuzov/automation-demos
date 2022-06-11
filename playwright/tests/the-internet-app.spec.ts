import { test, expect, Page } from '@playwright/test';

test('should show dynamically created element', async ({ page }) => {
    await page.goto('http://localhost:8080/dynamic_loading/2');
    await page.click('#start button');
    await expect(page.locator('#finish h4')).toBeVisible();
});

test('should show dynamically displayed element', async ({ page }) => {
    await page.goto('http://localhost:8080/dynamic_loading/1');
    await page.click('#start button');
    await expect(page.locator('#finish h4')).toBeVisible();
});

test('should login with valid credentials', async ({ page }) => {
    await login(page, 'tomsmith', 'SuperSecretPassword!')
    const message = await getAlertText(page);
    expect(message).toContain('You logged into a secure area!');
});

test('should login with invalid username', async ({ page }) => {
    await login(page, 'wrongUsername', 'SuperSecretPassword!')
    const message = await getAlertText(page);
    expect(message).toContain('Your username is invalid!');
});

test('should login with invalid password', async ({ page }) => {
    await login(page, 'tomsmith', 'wrongPassword')
    const message = await getAlertText(page);
    expect(message).toContain('Your password is invalid!');
});

async function login(page: Page, username: string, password: string): Promise<void> {
    await page.goto('http://localhost:8080/login');
    await page.locator('#username').fill(username);
    await page.locator('#password').fill(password);
    await page.click('button[type="submit"]');
}

async function getAlertText(page: Page): Promise<string | null> {
    return await page.locator('#flash').textContent();
}