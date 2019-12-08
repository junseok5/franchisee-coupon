import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm"
import { verifStoreStatus } from "../constants"
import Store from "./Store"

const { REQUESTING, ACCEPTED, REJECTED } = verifStoreStatus

@Entity()
class VerificationStore extends BaseEntity {
    @PrimaryGeneratedColumn() id: number

    @Column({
        type: "text",
        enum: [REQUESTING, ACCEPTED, REJECTED],
        default: REQUESTING
    })
    status?: string

    @Column({ type: "text" })
    bizRegImg: string

    @OneToOne(
        type => Store,
        store => store.verificationStore
    )
    store: Store

    @CreateDateColumn() createdAt: string
    @UpdateDateColumn() updatedAt: string
}

export default VerificationStore
