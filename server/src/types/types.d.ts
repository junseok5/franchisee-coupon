import Owner from "../entities/Owner"

export interface RegisterOwnerBody {
    name: string
    id: string
    password: string
    email: string
}
