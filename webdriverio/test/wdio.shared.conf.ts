import * as yargs from 'yargs';
import * as os from 'os';

export const config: WebdriverIO.Config = {
    capabilities: [],

    // ==================
    // Specify Test Files
    // ==================
    specs: [
        './test/specs/**/*.ts'
    ],
    exclude: [
        // 'path/to/excluded/files'
    ],

    // ============
    // Parallelism
    // ============
    maxInstances: <number>yargs.argv['threads'] || os.cpus().length,

    // ============
    // Base URL
    // ============
    baseUrl: yargs.argv['url'] || 'https://the-internet.herokuapp.com/',

    // ============
    // Headless
    // ============
    headless: <boolean>process.argv.includes('--headless') ? true : false,

    // ============
    // WebdriverIO Capabilities
    // ============
    waitforInterval: 100,
    waitforTimeout: 10000,
    connectionRetryTimeout: 60000,
    connectionRetryCount: 3,
    bail: 0,

    // ============
    // Log Levels
    // Verbosity: trace | debug | info | warn | error | silent
    // ============
    logLevels: {
        webdriver: 'error',
        chromedriver: 'error',
        geckodriver: 'error',
        devtools: 'error',
        '@wdio/cli:launcher': 'error',
        '@wdio/local-runner': 'error',
        '@wdio/junit-reporter': 'info'
    },

    // ============
    // Reporters
    // ============
    reporters: [
        'spec',
        ['junit', {
            outputDir: './junit-results',
            errorOptions: {
                error: 'message',
                failure: 'message',
                stacktrace: 'stack'
            },
            outputFileFormat: function (options) {
                return `results-${options.cid}.xml`;
            }
        }]
    ],

    // ============
    // Framework
    // ============
    framework: 'mocha',
    mochaOpts: {
        ui: 'bdd',
        timeout: process.env.DEBUG || <boolean>process.argv.includes('--long') ? 99999999 : 60000,
        retries: 0
    },

    // =====================
    // ts-node Configurations
    // =====================
    autoCompileOpts: {
        autoCompile: true,
        tsNodeOpts: {
            transpileOnly: true,
            project: 'test/tsconfig.json'
        }
    },

    // =====
    // Hooks
    // =====

    /**
     * Function to be executed after a test (in Mocha/Jasmine only)
     * @param {Object}  test             test object
     * @param {Object}  context          scope object the test was executed with
     * @param {Error}   result.error     error object in case the test fails, otherwise `undefined`
     * @param {Any}     result.result    return object of test function
     * @param {Number}  result.duration  duration of test
     * @param {Boolean} result.passed    true if test has passed, otherwise false
     * @param {Object}  result.retries   informations to spec related retries, e.g. `{ attempts: 0, limit: 0 }`
     */
    afterTest: function (test, context, { error, result, duration, passed, retries }) {
        if (!passed) {
            const filename = encodeURIComponent(test.title.replace(/\s+/g, '-'));
            const filePath = `./screenshots/${filename}.png`;

            // eslint-disable-next-line no-console
            console.log('\n\tScreenshot location:', filePath, '\n');
            browser.saveScreenshot(filePath);
        }
    }
}
