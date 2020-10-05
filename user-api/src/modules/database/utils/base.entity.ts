import { BaseEntity, BeforeInsert, BeforeUpdate, Column, Index, PrimaryGeneratedColumn } from 'typeorm'
import moment = require('moment-timezone')

/**
 * Implements database columns and ops common to all database entities
 *
 *
 * @export
 * @abstract
 * @class DatabaseBaseEntity
 * @extends {BaseEntity}
 */
export abstract class DatabaseBaseEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number

    @Index()
    @Column({
        default: () => 'NOW()',
        type: 'timestamp with time zone',
        update: false, // should not be set on updates
    })
    createdOn: string

    @Index()
    @Column({
        default: () => 'NOW()',
        type: 'timestamp with time zone',
    })
    modifiedOn: string

    /**
     * Fixes the fact the `@UpdateDateColumn` typeorm (or postgres) doesnt
     * correctly set the timezone flag 'Z' which causes all sorts of timezone issues.
     *
     * Non-Z timezones are interpreted by Javascript as localtime.
     *
     * These issues were previously resolved in the application layer.
     *
     * @memberof DatabaseBaseEntity
     */
    @BeforeUpdate()
    updateModifiedOn() {
        this.modifiedOn = moment.utc().toISOString() as any
    }

    /**
     * Fixes the fact the `@CreateDateColumn` typeorm (or postgres) doesnt
     * correctly set the timezone flag 'Z' which causes all sorts of timezone issues.
     *
     * Non-Z timezones are interpreted by Javascript as localtime.
     *
     * These issues were previously resolved in the application layer.
     *
     * @memberof DatabaseBaseEntity
     */
    @BeforeInsert()
    updateCreatedOn() {
        this.createdOn = moment.utc().toISOString() as any
        this.modifiedOn = this.createdOn
    }
}

export interface IBaseRecord {
    id: number
    createdOn: string
    modifiedOn: string
}
