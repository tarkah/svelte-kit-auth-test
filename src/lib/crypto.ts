import bcrypt from 'bcrypt';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import type { TokenPayload } from '$lib/middleware/auth';
import { serialize } from 'cookie';

const SALT_ROUNDS = 10;
const SECRET = secret();
const TOKEN_EXP_TIME = '5m';

function secret() {
	return crypto.randomBytes(48);
}

export const hashPassword = async (password: string): Promise<string> => {
	return bcrypt.hash(password, SALT_ROUNDS);
};

export const checkPassword = async (password: string, hash: string): Promise<boolean> => {
	return bcrypt.compare(password, hash);
};

export const createSecureToken = (payload: TokenPayload): string => {
	const token = jwt.sign(payload, SECRET, {
		expiresIn: TOKEN_EXP_TIME
	});

	return token;
};

export const decryptSecureToken = (token: string): Record<string, unknown> => {
	let payload;

	try {
		payload = jwt.verify(token, SECRET);
	} catch (error) {
		//console.log(error);
	}

	return payload;
};

export const createSecureTokenCookie = (token: string): string => {
	return serialize('token', token, {
		path: '/',
		httpOnly: true,
		sameSite: true
	});
};

export const removeSecureTokenCookie = (): string => {
	const now = new Date();

	return serialize('token', '', {
		path: '/',
		httpOnly: true,
		sameSite: true,
		expires: new Date(now.valueOf() - 5 * 60 * 1000)
	});
};
