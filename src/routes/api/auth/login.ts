import type { Context } from 'src/hooks';
import type { RequestHandler } from '@sveltejs/kit';
import { User } from '$lib/entity';
import { addSecureTokenCookie, checkPassword, createSecureToken } from '$lib/crypto';

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
				const token = createSecureToken({ user: { id: user.id } });
				const cookie = addSecureTokenCookie(token);

				return {
					body: {},
					headers: {
						'set-cookie': cookie
					}
				};
			}
		}
	}
};
