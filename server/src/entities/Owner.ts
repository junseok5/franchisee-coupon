import { IsEmail } from "class-validator"
import {
    BaseEntity,
    BeforeInsert,
    BeforeUpdate,
    Column,
    CreateDateColumn,
    Entity,
    OneToMany,
    PrimaryColumn,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm"
import * as bcrypt from "../utils/bcrypt"
import Store from "./Store"

@Entity()
class Owner extends BaseEntity {
    @PrimaryGeneratedColumn() num: number

    @Column({ type: "text" })
    name: string

    @PrimaryColumn({ type: "text" })
    id: string

    @Column({ type: "text" })
    password: string

    @Column({ type: "text" })
    @IsEmail()
    email: string

    @OneToMany(
        type => Store,
        store => store.owner
    )
    stores: Store[]

    @CreateDateColumn() createdAt: string
    @UpdateDateColumn() updatedAt: string

    @BeforeInsert()
    @BeforeUpdate()
    async savePassword(): Promise<void> {
        if (this.password) {
            const hashed = await this.hashPassword(this.password)
            this.password = hashed
        }
    }

    public comparePassword(password: string): boolean {
        return bcrypt.compare(password, this.password)
    }

    private hashPassword(password: string): string {
        return bcrypt.hash(password)
    }
}

export default Owner
