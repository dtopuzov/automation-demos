const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    // Replace with https://the-internet.herokuapp.com to run against public site
    baseUrl: 'http://localhost:8080',
    viewportWidth: 1366,
    viewportHeight: 768
  },
});
