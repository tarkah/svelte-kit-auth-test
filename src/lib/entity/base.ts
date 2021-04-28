import { BaseEntity, BeforeUpdate, Column, PrimaryGeneratedColumn } from 'typeorm';

export abstract class Base extends BaseEntity {
	@PrimaryGeneratedColumn('uuid')
	id: string;

	@Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP', nullable: false })
	createdAt: Date;

	@Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP', nullable: false })
	updatedAt: Date;

	@BeforeUpdate()
	updateDates(): void {
		this.updatedAt = new Date();
	}
}
