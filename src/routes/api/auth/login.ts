import type { Context } from 'src/hooks';
import type { RequestHandler } from '@sveltejs/kit';
import { User } from '$lib/entity';
import { checkPassword } from '$lib/crypto';
import { startSession } from '$lib/session';

interface Body {
	username: string;
	password: string;
}

export const post: RequestHandler<Context, Body> = async (request) => {
	const body = request.body;

	if (body?.username && body?.password) {
		const user = await User.findOne({
			where: {
				username: body.username
			}
		});

		if (user) {
			const passIsValid = await checkPassword(body.password, user.passHash);

			if (passIsValid) {
				return startSession(user);
			}
		}
	}
};
