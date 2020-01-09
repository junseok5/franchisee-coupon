import {
    Entity,
    BaseEntity,
    PrimaryColumn,
    Column,
    CreateDateColumn,
    UpdateDateColumn
} from "typeorm"

@Entity()
class Admin extends BaseEntity {
    @PrimaryColumn() num: number

    @Column({ type: "text" })
    id: string

    @Column({ type: "text" })
    password: string

    @CreateDateColumn() createdAt: string
    @UpdateDateColumn() updatedAt: string
}

export default Admin
