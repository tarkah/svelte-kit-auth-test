import type { Context } from 'src/hooks';
import type { Request } from '@sveltejs/kit';
import type { ServerResponse } from '@sveltejs/kit/types/endpoint';

export const logRequest = async (request: Request<Context>): Promise<ServerResponse> => {
	console.log(`~> Received ${request.method} on ${request.path}`);

	return;
};
