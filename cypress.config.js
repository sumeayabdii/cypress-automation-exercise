const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    chromeWebSecurity: false,
    blockHosts: [
      "*.googlesyndication.com",
      "*.google-analytics.com",
      "*.googletagmanager.com",
      "*googleads*",
      "*pagead*",
      "*doubleclick*"
    ]
  },
});
