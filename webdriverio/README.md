# WebdriverIO Demos

WebdriverIO demos against `https://the-internet.herokuapp.com` app.

## Used Technologies

- [WebdriverIO](https://webdriver.io/) as e2e testing framework.
- [TypeScript](https://webdriver.io/docs/typescript.html) to get autocompletion and type safety.
- [Junit Reporter](https://webdriver.io/docs/junit-reporter.html) to generate results that can be parsed by Jenkins.
- [Yargs](https://yargs.js.org/) to easily parse commandline params.
- [ESLint](https://github.com/eslint/eslint) to enforce code consistency.

## Prerequisites

- [Node 14](https://nodejs.org/en/download/) or above

## Setup Drivers

Windows:

- Run `npm i -g chromedriver`
- See the output of the command above, at the end of the output you should see `ChromeDriver binary available at <SOME_FOLDER>\chromedriver.exe`
- Copy the path to folder where `chromedriver.exe` is installed (without the exe file, only folder).
- Add the folder above to `PATH` environment variable
- Note that changing `PATH` require restart of currently running consoles (or VSCode).

Linux or macOS:

- Just run `npm i -g chomedriver`, no need to add it to the path.

## Run tests

Run against `https://the-internet.herokuapp.com`:

```bash
npm run test
```

Run against locally hosted version of the internet app.

```bash
docker run -d -p 8080:5000 gprestes/the-internet
npm run test:local
```
