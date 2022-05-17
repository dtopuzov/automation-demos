import { config } from './wdio.shared.conf';

let driverPath = process.env['CHROME_DRIVER_PATH'];
if (driverPath === undefined) {
    driverPath = '/usr/local/bin/chromedriver';
}

exports.config = {
    // ============
    // Base Config
    // ============
    ...config,

    // ============
    // Service
    // ============
    services: [
        ['chromedriver', {
            chromedriverCustomPath: driverPath,
            args: ['--silent']
        }]
    ],

    // ============
    // Capabilities
    // ============
    capabilities: [{
        browserName: 'chrome',
        acceptInsecureCerts: true,
        'goog:loggingPrefs': {
            browser: 'ALL',
            performance: 'ALL',
            driver: 'ALL',
        },
        'goog:chromeOptions': {
            args: [config.headless ? '--headless' : '--no-headless',
                '--disable-dev-shm-usage',
                '--force-device-scale-factor=1',
                '--no-sandbox',
                '--disable-gpu',
                '--window-size=1366,768',
                '--no-first-run',
                '--disable-extensions',
                '--disable-notifications',
                '--ignore-certificate-errors',
                '--disable-notifications'
            ],
        },
    }]
};
