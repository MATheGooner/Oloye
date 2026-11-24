import type { HandleServerError } from '@sveltejs/kit/hooks';

export const handleError: HandleServerError = ({ kind }) => {
  if (kind === 'unknown') {
    // Omit request data, environment values and upstream response bodies.
    console.error('Unexpected storefront error');
    return { status: 500, message: 'Something went wrong. Please try again shortly.' };
  }
};
