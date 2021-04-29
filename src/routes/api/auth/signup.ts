import type { Context } from 'src/hooks';
import { Raw } from 'typeorm';
import type { RequestHandler } from '@sveltejs/kit';
import { User } from '$lib/entity';
import { hashPassword } from '$lib/crypto';
import { startSession } from '$lib/session';

interface Body {
	username: string;
	email: string;
	password: string;
}

export const post: RequestHandler<Context, Body> = async (request) => {
	const { username, email, password } = request.body || {};

	if (username && email && password) {
		const cleanedEmail = email?.toLowerCase().trim();

		const duplicate = await User.findOne({
			where: [
				{
					email: Raw((alias) => `${alias} = :bind1`, { bind1: cleanedEmail })
				},
				{
					username: Raw((alias) => `${alias} = :bind2`, { bind2: username })
				}
			],
			cache: false
		});

		if (!duplicate) {
			const passHash = await hashPassword(password);

			const user = new User(username, cleanedEmail, passHash);
			await user.save();

			return startSession(user);
		}
	}
};
