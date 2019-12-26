import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm"
import { verifStoreStatus } from "../constants"

const { NOT_VERIFIED, REQUESTING, ACCEPTED, REJECTED } = verifStoreStatus

@Entity()
class VerificationStore extends BaseEntity {
    @PrimaryGeneratedColumn() id: number

    @Column({
        type: "text",
        enum: [NOT_VERIFIED, REQUESTING, ACCEPTED, REJECTED],
        default: NOT_VERIFIED
    })
    status?: string

    @Column({ type: "text", nullable: true })
    bizRegImg?: string

    @CreateDateColumn() createdAt: string
    @UpdateDateColumn() updatedAt: string
}

export default VerificationStore
