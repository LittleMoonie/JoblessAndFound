import { defineConfig } from 'cypress';

module.exports = defineConfig({
  e2e: {
    specPattern: '**/*.cy.{js,jsx,ts,tsx}',  // This pattern searches the entire project for test files
  },
});

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:3000',
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    supportFile: false,  
  },
});
