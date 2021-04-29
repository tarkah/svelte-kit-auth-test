import * as db from '$lib/db';
import type { GetContext, GetSession, Handle, Incoming } from '@sveltejs/kit';
import { logRequest } from '$lib/middleware';
import { parseToken, useApiAuth } from '$lib/middleware/auth';

export interface Context {
	user?: {
		id: string;
	};
}

export interface Session {
	authenticated: boolean;
}

export const getContext: GetContext = async (incoming: Incoming) => {
	await db.setup();

	let user;

	const tokenPayload = await parseToken(incoming);

	if (tokenPayload) {
		user = tokenPayload.user;
	}

	return {
		user: user
	};
};

export const getSession: GetSession<Context, Session> = async ({ context }) => {
	return {
		authenticated: context.user ? true : false
	};
};

export const handle: Handle<Context> = async ({ request, render }) => {
	const middleware = [logRequest, useApiAuth];

	for (const func of middleware) {
		const resp = await func(request);

		if (resp) {
			return resp;
		}
	}

	return render(request);
};
