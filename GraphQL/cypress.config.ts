import { defineConfig } from 'cypress';
import coverage from '@cypress/code-coverage/task';

export default defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5173',
    defaultCommandTimeout: 20000,
    setupNodeEvents(on, config) {
      coverage(on, config);

      return config;
    },
  },
  video: false,
});
