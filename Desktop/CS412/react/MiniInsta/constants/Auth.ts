/**
 * authFetch - A wrapper around fetch() that automatically adds two headers on every request:
 *
 *   Authorization  - DRF TokenAuthentication; required on all requests.
 *   X-CSRFToken    - Django CSRF protection; required on all state-
 *                    changing requests (POST, PUT, PATCH, DELETE).
 *                    Included on every call here for simplicity, since
 *                    Django ignores it on safe methods (GET, HEAD).
 *
 * Usage is identical to fetch():
 *   const res = await authFetch('/api/profile/1/posts');
 *   const res = await authFetch('/api/profile/1/add_follow', { method: 'POST' });
 */
export const BASE_URL = 'https://cs-webapps.bu.edu/airlin/mini_insta';

export const authFetch = (
  endpoint: string,
  token: string,
  options: RequestInit = {}
): Promise<Response> => {
  return fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { 'Authorization': `Token ${token}` } : {}),
      ...(options.headers as Record<string, string>),
    },
  });
};