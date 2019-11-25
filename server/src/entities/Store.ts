import {
    BaseEntity,
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    OneToMany,
    OneToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm"
import Advertisement from "./Advertisement"
import Owner from "./Owner"
import VerificationStore from "./VerificationStore"

@Entity()
class Store extends BaseEntity {
    @PrimaryGeneratedColumn() id: number

    @Column({ type: "text" })
    name: string

    @Column({ type: "text" })
    description: string

    @Column({ type: "text" })
    address: string

    @Column({ type: "text" })
    category: string

    @Column({ type: "text", nullable: true })
    webUrl?: string

    @Column({ type: "text", nullable: true })
    logoImg?: string

    @Column({ type: "double precision", default: 0 })
    lat: number

    @Column({ type: "double precision", default: 0 })
    lng: number

    @ManyToOne(
        type => Owner,
        owner => owner.stores
    )
    owner: Owner

    @OneToOne(
        type => VerificationStore,
        verificationStore => verificationStore.store
    )
    verificationStore: VerificationStore

    @OneToMany(
        type => Advertisement,
        advertisment => advertisment.store
    )
    advertisement: Advertisement

    @CreateDateColumn() createdAt: string

    @UpdateDateColumn() updatedAt: string
}

export default Store
