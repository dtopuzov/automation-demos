import { Browser, By } from "../selenium/browser";
import { Settings } from "../selenium/settings";

let browser: Browser;

beforeAll(() => {
    browser = new Browser();
});

afterAll(async () => {
    await browser.close();
});

test('should show dynamically displayed element', async () => {
    await browser.navigateTo(`${Settings.baseUrl}dynamic_loading/1`);
    await browser.click(By.css('#start button'));
    expect(await browser.isVisible(By.css('#finish h4'))).toBe(true);
});