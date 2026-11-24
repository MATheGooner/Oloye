import {
  MEDUSA_BACKEND_URL,
  MEDUSA_PUBLISHABLE_KEY,
  MEDUSA_REQUEST_TIMEOUT_MS
} from '$app/env/private';

export class MedusaRequestError extends Error {
  constructor(public readonly status: number, message: string) {
    super(message);
    this.name = 'MedusaRequestError';
  }
}

/** Server-only transport. Paths are controlled by application code, never user URLs. */
export async function medusaFetch(
  path: string,
  fetcher: typeof fetch = fetch,
  options: RequestInit = {}
): Promise<Response> {
  const url = new URL(path, MEDUSA_BACKEND_URL);
  if (url.origin !== MEDUSA_BACKEND_URL || url.username || url.password ||
      (url.pathname !== '/health' && !url.pathname.startsWith('/store/'))) {
    throw new MedusaRequestError(500, 'Unsupported Medusa API path');
  }

  const headers = new Headers(options.headers);
  headers.set('accept', 'application/json');
  if (url.pathname.startsWith('/store/')) {
    if (!MEDUSA_PUBLISHABLE_KEY) {
      throw new MedusaRequestError(500, 'Configure MEDUSA_PUBLISHABLE_KEY for Store API requests');
    }
    headers.set('x-publishable-api-key', MEDUSA_PUBLISHABLE_KEY);
  }

  const timeout = AbortSignal.timeout(MEDUSA_REQUEST_TIMEOUT_MS);
  const signal = options.signal ? AbortSignal.any([options.signal, timeout]) : timeout;

  try {
    const response = await fetcher(url, {
      ...options,
      headers,
      signal,
      cache: 'no-store',
      redirect: 'error'
    });
    if (!response.ok) {
      throw new MedusaRequestError(response.status, 'Medusa request failed');
    }
    return response;
  } catch (error) {
    if (error instanceof MedusaRequestError) throw error;
    throw new MedusaRequestError(timeout.aborted ? 504 : 502, 'Commerce service unavailable');
  }
}

export async function isCommerceAvailable(fetcher: typeof fetch = fetch): Promise<boolean> {
  try {
    const response = await medusaFetch('/health', fetcher);
    return (await response.text()).trim() === 'OK';
  } catch {
    // Body-read failures and timeouts also mean the upstream is unavailable.
    return false;
  }
}
