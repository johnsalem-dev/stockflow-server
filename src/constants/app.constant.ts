/**
 * Application defaults. Non-sensitive values only.
 * DB credentials must always come from .env - never hardcoded.
 */
export const APP_DEFAULTS = {
  PORT: 3000,
} as const;

export const NODE_ENV = {
  DEVELOPMENT: 'development',
  PRODUCTION: 'production',
  TEST: 'test',
} as const;
