import type { Context } from 'src/hooks';
import type { RequestHandler } from '@sveltejs/kit';
import { removeSecureTokenCookie } from '$lib/crypto';

export const get: RequestHandler<Context> = async () => {
	const cookie = removeSecureTokenCookie();

	return {
		headers: {
			'set-cookie': cookie
		},
		body: {}
	};
};
