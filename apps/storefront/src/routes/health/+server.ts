import { isCommerceAvailable } from '#lib/server/medusa.js';
import type { RequestHandler } from './$types';

/** Readiness verifies an actual request to Medusa's built-in health route. */
export const GET: RequestHandler = async ({ fetch }) => {
  const commerce = await isCommerceAvailable(fetch);
  return Response.json(
    {
      status: commerce ? 'ok' : 'degraded',
      services: { storefront: 'ok', commerce: commerce ? 'ok' : 'unavailable' }
    },
    { status: commerce ? 200 : 503, headers: { 'cache-control': 'no-store' } }
  );
};
