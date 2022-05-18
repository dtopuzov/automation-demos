import { Browser, By } from "../selenium/browser";
import { Settings } from "../selenium/settings";

let browser: Browser;

beforeAll(async () => {
    browser = new Browser();
});

beforeEach(async () => {
    await browser.navigateTo(`${Settings.baseUrl}login`);
});

afterAll(async () => {
    await browser.close();
});

test('should login with valid credentials', async () => {
    await login(browser, 'tomsmith', 'SuperSecretPassword!')
    const message = await getAlertText(browser);
    expect(message).toContain('You logged into a secure area!');
});

test('should login with invalid username', async () => {
    await login(browser, 'wrongUsername', 'SuperSecretPassword!')
    const message = await getAlertText(browser);
    expect(message).toContain('Your username is invalid!');
});

test('should login with invalid password', async () => {
    await login(browser, 'tomsmith', 'wrongPassword')
    const message = await getAlertText(browser);
    expect(message).toContain('Your password is invalid!');
});

async function login(browser: Browser, username: string, password: string): Promise<void> {
    await browser.type(await browser.find(By.id('username')), username);
    await browser.type(await browser.find(By.id('password')), password);
    await browser.click(By.css('button[type="submit"]'));
}

async function getAlertText(browser: Browser): Promise<string> {
    const alert = await browser.find(By.id('flash'));
    return await alert.getText();
}