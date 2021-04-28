import type { Context } from 'src/hooks';
import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler<Context> = async (request) => {
	const context = request.context;

	if (context.user) {
		return {
			body: {}
		};
	}
};
