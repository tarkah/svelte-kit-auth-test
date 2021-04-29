import bcrypt from 'bcrypt';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import type { TokenPayload } from '$lib/middleware/auth';

const SALT_ROUNDS = 10;
const SECRET = secret();
const TOKEN_EXP_TIME = '24 hrs';

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
