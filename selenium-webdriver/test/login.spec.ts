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
    expect(await getAlertText(browser)).toEqual('You logged into a secure area!');
});

test('should login with invalid username', async () => {
    await login(browser, 'wrongUsername', 'SuperSecretPassword!')
    expect(await getAlertText(browser)).toEqual('Your username is invalid!');
});

test('should login with invalid password', async () => {
    await login(browser, 'tomsmith', 'wrongPassword')
    expect(await getAlertText(browser)).toEqual('Your password is invalid!');
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