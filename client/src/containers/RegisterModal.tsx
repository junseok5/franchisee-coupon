import * as React from "react"
import { useState } from 'react'
import Input from "src/components/Input"
import Modal from "src/components/Modal"
import useInput from "src/hooks/useInput"

const RegisterModal: React.SFC = () => {
    const [id, changeId] = useInput("")
    const [password, changePassword] = useInput("")
    const [show, changeShow] = useState(false)

    /*
        redux 적용하여 modal show state 글로벌 관리 필요
    */

    return (
        <Modal title={"회원가입"} show={show} >
            <Input placeholder={"아이디"} value={id} onChange={changeId} />
            <Input
                placeholder={"비밀번호"}
                value={password}
                onChange={changePassword}
            />
        </Modal>
    )
}

export default RegisterModal
