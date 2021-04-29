import { Session, User } from '$lib/entity';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { createConnection, getConnectionManager } from 'typeorm';
import { dev } from '$app/env';

let initialized = false;

export const setup = async (): Promise<void> => {
	if (!initialized) {
		const manager = getConnectionManager();

		if (!manager.has('default')) {
			await createConnection({
				type: 'sqlite',
				database: 'testdb.sql',
				synchronize: dev,
				logging: false, //dev,
				dropSchema: dev,
				entities: [Session, User],
				namingStrategy: new SnakeNamingStrategy()
			});

			initialized = true;
		}
	}
};
