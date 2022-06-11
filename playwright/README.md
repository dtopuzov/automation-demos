# Playwright Demos

Playwright demos against `https://the-internet.herokuapp.com` app.

## Used Technologies

- [Playwright](https://www.selenium.dev) as e2e testing framework.
- [TypeScript](https://www.typescriptlang.org) to get autocompletion and type safety.
- [ESLint](https://github.com/eslint/eslint) to enforce code consistency.

## Prerequisites

- [Node 16](https://nodejs.org/en/download/) or above

## Run tests

Run against locally hosted version of the internet app.

```bash
docker run -d -p 8080:5000 gprestes/the-internet
npm ci
npm run bootstrap
npm run test
```
