import { Column, Entity } from 'typeorm';

import { Base } from './base';

@Entity()
export class User extends Base {
	@Column({ type: 'text', nullable: false, unique: true })
	username: string;

	@Column({ type: 'text', nullable: false, unique: true })
	email: string;

	@Column({ type: 'text', nullable: false })
	passHash: string;

	constructor(username: string, email: string, passHash: string) {
		super();

		this.username = username;
		this.email = email;
		this.passHash = passHash;
	}
}
