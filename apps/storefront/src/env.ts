import { defineEnvVars } from '@sveltejs/kit/env';

export const variables = defineEnvVars({
  MEDUSA_BACKEND_URL: {
    schema: (value: string | undefined) => {
      const url = new URL(value || 'http://localhost:9000');
      if (!['http:', 'https:'].includes(url.protocol) || url.username || url.password ||
          url.pathname !== '/' || url.search || url.hash) {
        throw new Error('MEDUSA_BACKEND_URL must be an HTTP(S) origin without credentials');
      }
      return url.origin;
    }
  },
  MEDUSA_REQUEST_TIMEOUT_MS: {
    schema: (value: string | undefined) => {
      const timeout = Number(value || 5000);
      if (!Number.isInteger(timeout) || timeout < 1 || timeout > 30000) {
        throw new Error('MEDUSA_REQUEST_TIMEOUT_MS must be an integer between 1 and 30000');
      }
      return timeout;
    }
  },
  MEDUSA_PUBLISHABLE_KEY: {
    schema: (value: string | undefined) => value?.trim() || ''
  }
});
