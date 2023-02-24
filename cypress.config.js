const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
      // implement node event listeners here
      baseUrl: "https://api.trello.com/",
      specPattern: "cypress/e2e/**/*.{js,jsx,ts,tsx}",
      excludeSpecPattern: ["**/1-getting-started/*", '**/2-advanced-examples/*'],
      experimentalOriginDependencies: true
  },
});
