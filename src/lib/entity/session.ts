import { Column, Entity } from 'typeorm';

import { Base } from './base';

@Entity()
export class Session extends Base {
	@Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP', nullable: false })
	lastVerified: Date;

	constructor() {
		super();
	}
}
