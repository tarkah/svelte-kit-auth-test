import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { User } from '$lib/entity';
import { createConnection, getConnectionManager } from 'typeorm';
import { dev } from '$app/env';

export const setup = async (): Promise<void> => {
	const manager = getConnectionManager();

	if (!manager.has('default')) {
		await createConnection({
			type: 'sqlite',
			database: 'testdb.sql',
			synchronize: dev,
			logging: false, //dev,
			dropSchema: dev,
			entities: [User],
			namingStrategy: new SnakeNamingStrategy()
		});
	}
};
