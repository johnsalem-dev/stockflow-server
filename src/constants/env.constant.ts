/**
 * Environment variable keys.
 * Centralised to avoid magic strings and typos.
 */
export const ENV_KEYS = {
  NODE_ENV: 'NODE_ENV',
  PORT: 'PORT',

  DB_HOST: 'DB_HOST',
  DB_PORT: 'DB_PORT',
  DB_USERNAME: 'DB_USERNAME',
  DB_PASSWORD: 'DB_PASSWORD',
  DB_DATABASE: 'DB_DATABASE',
  DATABASE_URL: 'DATABASE_URL',

  LOG_LEVEL: 'LOG_LEVEL',
} as const;
