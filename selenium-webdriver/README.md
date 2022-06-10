# Selenium Demos

WebdriverIO demos against `https://the-internet.herokuapp.com` app.

## Used Technologies

- [selenium-webdriver](https://www.selenium.dev) as e2e testing framework.
- [Jest](https://jestjs.io) as test runner.
- [TypeScript](https://www.typescriptlang.org) to get autocompletion and type safety.
- [ESLint](https://github.com/eslint/eslint) to enforce code consistency.

## Prerequisites

- [Node 16](https://nodejs.org/en/download/) or above

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
export HEADLESS=true
export BASE_URL=https://the-internet.herokuapp.com/
npm run test
```

Run against locally hosted version of the internet app.

```bash
docker run -d -p 8080:5000 gprestes/the-internet

export HEADLESS=true
export BASE_URL=http://localhost:8080/
npm run test
```
