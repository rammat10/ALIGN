import { IS_STATIC_HOSTED_DEMO } from '@app/constants';
import useApiConfig from '@app/stores/apiConfig';
import type { UpdateEvalAuthorResponse } from '@promptfoo/types/api/eval';
import type { GetUserIdResponse, GetUserResponse } from '@promptfoo/types/api/user';

export function getApiBaseUrl(): string {
  const { apiBaseUrl } = useApiConfig.getState();
  if (apiBaseUrl) {
    return apiBaseUrl.replace(/\/$/, '');
  }
  // Use base path from build-time config for local deployments behind reverse proxy
  return import.meta.env.VITE_PUBLIC_BASENAME || '';
}

export async function callApi(path: string, options: RequestInit = {}): Promise<Response> {
  if (IS_STATIC_HOSTED_DEMO) {
    if (path === '/version') {
      return new Response(
        JSON.stringify({
          currentVersion: import.meta.env.VITE_PROMPTFOO_VERSION,
          latestVersion: import.meta.env.VITE_PROMPTFOO_VERSION,
          updateAvailable: false,
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } },
      );
    }

    if (path === '/user/id') {
      return new Response(JSON.stringify({ id: null }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (path === '/user/email') {
      return new Response(JSON.stringify({ email: null }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    if (path === '/remote-health') {
      return new Response(JSON.stringify({ status: 'DISABLED', message: 'Static demo mode' }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ error: 'Static demo mode has no live API backend' }), {
      status: 503,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  return fetch(`${getApiBaseUrl()}/api${path}`, options);
}

export async function fetchUserEmail(): Promise<string | null> {
  try {
    const response = await callApi('/user/email', {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user email');
    }

    const data: GetUserResponse = await response.json();
    return data.email;
  } catch (error) {
    console.error('Error fetching user email:', error);
    return null;
  }
}

export async function fetchUserId(): Promise<string | null> {
  try {
    const response = await callApi('/user/id', {
      method: 'GET',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user ID');
    }

    const data: GetUserIdResponse = await response.json();
    return data.id;
  } catch (error) {
    console.error('Error fetching user ID:', error);
    return null;
  }
}

export async function updateEvalAuthor(
  evalId: string,
  author: string,
): Promise<UpdateEvalAuthorResponse> {
  const response = await callApi(`/eval/${evalId}/author`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ author }),
  });

  if (!response.ok) {
    throw new Error('Failed to update eval author');
  }

  return response.json();
}
