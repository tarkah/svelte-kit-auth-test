import * as cookie from 'cookie';
import type { Context } from 'node:vm';
import type { Incoming, Request } from '@sveltejs/kit';
import type { ServerResponse } from '@sveltejs/kit/types/endpoint';
import { Session } from '$lib/entity';
import { decryptSecureToken } from '$lib/crypto';

export interface TokenPayload {
	sessionId: string;

	user: {
		id: string;
	};
}

const isTokenPayload = (input: TokenPayload | Record<string, unknown>): input is TokenPayload => {
	return (input as TokenPayload)?.user !== undefined;
};

export const parseToken = async ({ headers }: Incoming): Promise<TokenPayload> => {
	const cookies = cookie.parse(headers.cookie || '');

	const token = cookies.token;

	if (token) {
		const payload = decryptSecureToken(token);

		if (isTokenPayload(payload)) {
			const activeSession = await Session.findOne(payload.sessionId);

			if (activeSession) {
				return payload;
			}
		}
	}
};

// Allows use of /api only if user is authenticated OR for unathenticaed requests
// to /api/auth
export const useApiAuth = async (request: Request<Context>): Promise<ServerResponse> => {
	const context = request.context;
	const path = request.path;

	const isAuthenticated = context.user ? true : false;

	const pathParts = path.split('/').reverse();
	pathParts.pop();

	const isApiRequest = pathParts.pop() === 'api';

	if (isApiRequest) {
		const isAuthRequest = pathParts.pop() === 'auth';

		if (!isAuthenticated && !isAuthRequest) {
			return {
				status: 404,
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({})
			};
		}
	}
};
