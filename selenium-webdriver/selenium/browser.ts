import { By, ThenableWebDriver, until, WebElement, WebElementCondition } from "selenium-webdriver";
import { Level, Type } from "selenium-webdriver/lib/logging";
import { EC, WaitCondition } from "./conditions";
import { DriverManager } from "./driver-manager";

export { By, ThenableWebDriver, until, WebElement, WebElementCondition } from "selenium-webdriver";

export class Browser {
    public driver: ThenableWebDriver;

    constructor() {
        this.driver = new DriverManager().getDriver();
    }

    public async close(): Promise<void> {
        await this.driver.quit();
    }

    public async navigateTo(url: string): Promise<void> {
        await this.driver.navigate().to(url);
    }

    public async refresh(): Promise<void> {
        await this.driver.navigate().refresh();
    }

    public async getCurrentUrl(): Promise<string> {
        return await this.driver.getCurrentUrl();
    }

    public async find(locator: By, timeout = 10000): Promise<WebElement> {
        return await this.driver.wait(until.elementLocated(locator), timeout,
            `Failed to find element located by ${locator}.`);
    }

    public async findAll(locator: By): Promise<WebElement[]> {
        return await this.driver.findElements(locator);
    }

    public async click(locator: By, timeout = 10000): Promise<void> {
        const element = await this.find(locator, timeout);
        await element.click();
    }

    public async hover(locator: By, timeout = 10000): Promise<void> {
        const element = await this.find(locator, timeout);
        const actions = this.driver.actions({ async: true });
        await actions.move({ origin: element }).perform();
    }

    public async contextClick(locator: By, timeout = 10000): Promise<void> {
        const element = await this.find(locator, timeout);
        const actions = this.driver.actions({ async: true });
        await actions.contextClick(element).perform();
    }

    public async dragTo(source: WebElement, target: WebElement): Promise<void> {
        const actions = this.driver.actions({ async: true });
        await actions.dragAndDrop(source, target).perform();
    }

    public async dragByOffset(source: WebElement, offsetX: number, offsetY: number): Promise<void> {
        const actions = this.driver.actions({ async: true });
        await actions.dragAndDrop(source, { x: offsetX, y: offsetY }).perform();
    }

    public async type(element: WebElement, text: string, clear = true): Promise<void> {
        if (clear) {
            await element.clear();
        }
        await element.sendKeys(text);
    }

    public async sendKey(key: string): Promise<void> {
        await this.driver.actions().sendKeys(key).perform();
    }

    public async sendKeyCombination(key1: string, key2: string): Promise<void> {
        await this.driver.actions().keyDown(key1).keyDown(key2).keyUp(key2).keyUp(key1).perform();
    }

    public async isVisible(locator: By, timeout = 10000): Promise<boolean> {
        return await this.waitSafely(EC.isVisible(locator), timeout);
    }

    public async isNotVisible(locator: By, timeout = 10000): Promise<boolean> {
        return await this.waitSafely(EC.notVisible(locator), timeout);
    }

    public async isInViewport(locator: By, timeout = 10000): Promise<boolean> {
        return await this.waitSafely(EC.isInViewport(locator), timeout);
    }

    public async isNotInViewport(locator: By, timeout = 10000): Promise<boolean> {
        return await this.waitSafely(EC.notInViewport(locator), timeout);
    }

    public async hasFocus(element: WebElement): Promise<boolean> {
        return await this.waitSafely(EC.hasFocus(element));
    }

    public async hasText(element: WebElement, text: string): Promise<boolean> {
        return await this.waitSafely(EC.hasText(element, text));
    }

    public async hasValue(element: WebElement, value: string): Promise<boolean> {
        return await this.waitSafely(EC.hasValue(element, value));
    }

    public async hasAttribute(element: WebElement, attribute: string, value: string): Promise<boolean> {
        return await this.waitSafely(EC.hasAttribute(element, attribute, value));
    }

    public async wait(condition: WebElementCondition | WaitCondition, timeout = 10000, message = undefined): Promise<void> {
        await this.driver.wait(condition, timeout, message);
    }

    public async waitSafely(condition: WebElementCondition | WaitCondition, timeout = 10000): Promise<boolean> {
        try {
            await this.driver.wait(condition, timeout);
            return true;
        }
        catch (error) {
            return false;
        }
    }

    public async sleep(milliseconds: number): Promise<void> {
        await this.driver.sleep(milliseconds);
    }

    public async getScreenshot(): Promise<string> {
        return await this.driver.takeScreenshot();
    }

    public async getBrowserName(): Promise<string> {
        const capabilities = (await (await this.driver).getCapabilities());
        return capabilities.getBrowserName().toLowerCase();
    }

    public async getErrorLogs(excludeList = ["favicon.ico"]): Promise<string[]> {
        const errors = [];
        const capabilities = (await (await this.driver).getCapabilities());
        const platform = capabilities.getPlatform().toLowerCase();
        const browserName = capabilities.getBrowserName().toLowerCase();

        // Can not get FF logs due to issue.
        // Please see:
        // https://github.com/mozilla/geckodriver/issues/284#issuecomment-477677764
        //
        // Note: Logs are not supported on mobile platforms too!
        if (browserName === "chrome" && platform !== "android" && platform !== "iphone") {
            const logs = await this.driver.manage().logs().get(Type.BROWSER);
            for (const entry of logs) {
                if (entry.level === Level.SEVERE) {
                    errors.push(entry.message);
                }
            }
        }

        // Filter errors
        const filteredErrors = [];
        for (const entry of errors) {
            for (const excludeItem of excludeList) {
                const error = entry.indexOf(excludeItem) >= 0;
                if (!error && filteredErrors.indexOf(entry) < 0) {
                    filteredErrors.push(entry);
                    break;
                }
            }
        }

        return filteredErrors;
    }
}