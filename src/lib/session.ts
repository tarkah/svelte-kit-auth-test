import type { ServerResponse } from '@sveltejs/kit/types/endpoint';
import { serialize } from 'cookie';

import { Session, User } from './entity';
import { createSecureToken } from './crypto';

const createSecureTokenCookie = (token: string): string => {
	return serialize('token', token, {
		path: '/',
		httpOnly: true,
		sameSite: true
	});
};

const removeSecureTokenCookie = (): string => {
	const now = new Date();

	return serialize('token', '', {
		path: '/',
		httpOnly: true,
		sameSite: true,
		expires: new Date(now.valueOf() - 5 * 60 * 1000)
	});
};

export const startSession = async (user: User): Promise<ServerResponse> => {
	const session = await new Session().save();

	const token = createSecureToken({ sessionId: session.id, user: { id: user.id } });
	const cookie = createSecureTokenCookie(token);

	return {
		headers: {
			'set-cookie': cookie
		},
		body: {}
	};
};

export const endSession = async (idOrSession: string | Session): Promise<ServerResponse> => {
	let session;

	if (idOrSession instanceof Session) {
		session = idOrSession;
	} else {
		session = await Session.findOne(idOrSession);
	}

	await session.remove();

	const cookie = removeSecureTokenCookie();

	return {
		headers: {
			'set-cookie': cookie
		},
		body: {}
	};
};
