import type { Context } from 'src/hooks';
import type { RequestHandler } from '@sveltejs/kit';
import { endSession } from '$lib/session';

export const get: RequestHandler<Context> = async (request) => {
	if (request.context.sessionId) {
		return endSession(request.context.sessionId);
	}
};
