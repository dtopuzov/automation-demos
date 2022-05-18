import { By, WebDriver, WebElement } from "selenium-webdriver";

export type WaitCondition = (driver: WebDriver) => Promise<boolean>;

const VIEWPORT_SCRIPT = function (element: Element) {
    const box = element.getBoundingClientRect();
    const cx = box.left + box.width / 2;
    const cy = box.top + box.height / 2;
    let target = document.elementFromPoint(cx, cy);
    while (target) {
        if (target === element) {
            return true;
        }
        target = target.parentElement;
    }
    return false;
};

export class EC {
    public static hasText(element: WebElement, text: string): (driver: WebDriver) => Promise<boolean> {
        return () => element.getText().then(result => {
            return result === text;
        });
    }

    public static hasValue(element: WebElement, value: string): (driver: WebDriver) => Promise<boolean> {
        return () => element.getAttribute("value").then(result => {
            return result === value;
        });
    }

    public static hasFocus(element: WebElement): (driver: WebDriver) => Promise<boolean> {
        return async (driver: WebDriver) => {
            const focused = await driver.switchTo().activeElement();
            return await element.getId() === await focused.getId();
        };
    }

    public static hasChild(element: WebElement, locator: By): () => Promise<boolean> {
        return async () => {
            return element.findElements(locator).then(result => {
                return result.length > 0;
            });
        };
    }

    public static hasAttribute(element: WebElement, attribute: string, value: string): (driver: WebDriver) => Promise<boolean> {
        return () => element.getAttribute(attribute).then(result => {
            return result.includes(value);
        });
    }

    public static isVisible(locator: By): (driver: WebDriver) => Promise<boolean> {
        return async (driver: WebDriver) => {
            try {
                const element = await driver.findElement(locator);
                return await element.isDisplayed();
            } catch {
                return false;
            }
        };
    }

    public static notVisible(locator: By): (driver: WebDriver) => Promise<boolean> {
        return async (driver: WebDriver) => {
            try {
                const element = await driver.findElement(locator);
                return !(await element.isDisplayed());
            } catch {
                return true;
            }
        };
    }

    public static isInViewport(locator: By): (driver: WebDriver) => Promise<boolean> {
        return async (driver: WebDriver) => {
            try {
                const element = await driver.findElement(locator);
                const result = await driver.executeScript(VIEWPORT_SCRIPT, element);
                return (result + '') === 'true';
            } catch {
                return false;
            }
        };
    }

    public static notInViewport(locator: By): (driver: WebDriver) => Promise<boolean> {
        return async (driver: WebDriver) => {
            try {
                const element = await driver.findElement(locator);
                const result = await driver.executeScript(VIEWPORT_SCRIPT, element);
                return (result + '') === 'false';
            } catch {
                return true;
            }
        };
    }
}
