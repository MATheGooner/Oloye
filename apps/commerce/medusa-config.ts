import { defineConfig, loadEnv } from '@medusajs/framework/utils';

loadEnv(process.env.NODE_ENV || 'development', process.cwd());

function required(name: string): string {
  const value = process.env[name]?.trim();
  if (!value || value.includes('replace-with-')) {
    throw new Error(`Configure ${name} in the commerce environment`);
  }
  return value;
}

function secret(name: string): string {
  const value = required(name);
  if (value.length < 32) throw new Error(`${name} must contain at least 32 characters`);
  return value;
}

function cors(name: string): string {
  return required(name).split(',').map((origin) => {
    const value = origin.trim();
    const url = new URL(value);
    if (!['http:', 'https:'].includes(url.protocol) || url.origin !== value) {
      throw new Error(`${name} must contain comma-separated HTTP(S) origins without paths`);
    }
    return url.origin;
  }).join(',');
}

const databaseUrl = required('DATABASE_URL');
if (!['postgres:', 'postgresql:'].includes(new URL(databaseUrl).protocol)) {
  throw new Error('DATABASE_URL must be a PostgreSQL connection URL');
}

// defineConfig registers the standard Medusa modules and local providers.
// Redis is unnecessary for this single-process development foundation.
module.exports = defineConfig({
  projectConfig: {
    databaseUrl,
    cookieOptions: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax'
    },
    sessionOptions: { name: 'oloye.sid' },
    http: {
      storeCors: cors('STORE_CORS'),
      adminCors: cors('ADMIN_CORS'),
      authCors: cors('AUTH_CORS'),
      jwtSecret: secret('JWT_SECRET'),
      cookieSecret: secret('COOKIE_SECRET')
    }
  }
});
