import * as React from "react"
import { useCallback } from "react"
import Modal from "src/components/Modal"
import useInput from "src/hooks/useInput"
import useLoginModal from "src/hooks/useLoginModal"
import Input from "src/components/Input"
import Button from "src/components/Button"
import useLoginRequest from "src/hooks/useLoginRequest"

interface LoginModalProps {}

const LoginModal: React.SFC<LoginModalProps> = () => {
    const [id, changeId] = useInput("")
    const [password, changePassword] = useInput("")
    const { loginModalVisible, onHideLoginModal } = useLoginModal()
    const { isLoggingIn, loginErrorMessage, logIn } = useLoginRequest()

    const onClickLogInButton = useCallback(() => {
        logIn({ id, password })
    }, [id, password])
    console.log(isLoggingIn)
    console.log(loginErrorMessage)

    return (
        <Modal
            title={"로그인"}
            show={loginModalVisible}
            onHideModal={onHideLoginModal}
        >
            <Input placeholder={"아이디"} value={id} onChange={changeId} />
            <Input
                type={"password"}
                placeholder={"비밀번호"}
                value={password}
                onChange={changePassword}
            />
            <Button title={"로그인"} onClick={onClickLogInButton} />
        </Modal>
    )
}

export default LoginModal
