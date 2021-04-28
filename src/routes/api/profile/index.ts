import type { Context } from 'src/hooks';
import type { RequestHandler } from '@sveltejs/kit';
import { User } from '$lib/entity';

import type { ApiResponse, ProfileData } from '../_responses';

export const get: RequestHandler<Context> = async ({ context }) => {
	const userId = context.user?.id;

	if (userId) {
		const user = await User.findOne(userId);

		if (user) {
			const response: ApiResponse<ProfileData> = {
				data: {
					email: user.email,
					username: user.username
				}
			};

			return {
				body: response
			};
		}
	}
};

export const del: RequestHandler<Context> = async ({ context }) => {
	const userId = context.user?.id;

	if (userId) {
		const user = await User.findOne(userId);

		if (user) {
			await user.remove();

			return {
				body: {}
			};
		}
	}
};
