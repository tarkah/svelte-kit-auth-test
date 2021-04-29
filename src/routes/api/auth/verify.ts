import type { Context } from 'src/hooks';
import type { RequestHandler } from '@sveltejs/kit';
import { Session } from '$lib/entity';
import { endSession } from '$lib/session';

const INACTIVITY_TIMEOUT_MINS = 1;

export const get: RequestHandler<Context> = async (request) => {
	const context = request.context;
	const sessionId = context.sessionId;

	if (sessionId) {
		const session = await Session.findOne(sessionId);

		if (session) {
			const lastVerified = session.lastVerified;
			const now = new Date();
			const minsSince = Math.round((now.valueOf() - lastVerified.valueOf()) / 60000);

			if (minsSince < INACTIVITY_TIMEOUT_MINS) {
				if (context.user) {
					// Session is still good
					session.lastVerified = now;
					await session.save();

					return {
						body: {
							verified: true
						}
					};
				}
			}

			return endSession(session);
		}
	}
};
