import {
    BaseEntity,
    BeforeInsert,
    Column,
    CreateDateColumn,
    Entity,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm"
import { adType } from "../constants"
import Store from "./Store"

const { SPECIAL, COUPON } = adType

@Entity()
class Advertisement extends BaseEntity {
    @PrimaryGeneratedColumn() id: number

    @Column({ type: "text" })
    title: string

    @Column({ type: "text", nullable: true })
    photo: string

    @Column({ type: "text", nullable: true })
    description?: string

    @Column({ type: "date" })
    startAt: string

    @Column({ type: "date" })
    endAt: string

    @Column({
        type: "boolean",
        default: false
    })
    isStopped: boolean

    @Column({ type: "text", enum: [SPECIAL, COUPON] })
    adType: string

    @Column({ type: "int" })
    category: number

    @Column({ type: "text", nullable: true })
    couponNum?: string

    @Column({ type: "int", default: 0 })
    views: number

    @Column({ type: "int", default: 0 })
    clickNum: number

    @Column({ type: "int", default: 0 })
    downloadNum: number

    @Column({ type: "int", default: 0 })
    usedCount: number

    @Column({ type: "double precision", default: 0 })
    lat: number

    @Column({ type: "double precision", default: 0 })
    lng: number

    @ManyToOne(
        type => Store,
        store => store.advertisement
    )
    store: Store

    @CreateDateColumn() createdAt: string

    @UpdateDateColumn() updatedAt: string

    @BeforeInsert()
    createCouponNum(): void {
        if (this.adType === COUPON) {
            this.couponNum = Math.floor(Math.random() * 100000000000).toString()
        }
    }
}

export default Advertisement
