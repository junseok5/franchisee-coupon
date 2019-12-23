import * as React from "react"
import { useCallback, useEffect } from "react"
import Modal from "src/components/Modal"
import useInput from "src/hooks/useInput"
import useLoginModal from "src/hooks/useLoginModal"
import Input from "src/components/Input"
import Button from "src/components/Button"
import useLoginRequest from "src/hooks/useLoginRequest"
import useOwnerInfo from "src/hooks/useOwnerInfo"
import { regex } from "src/constants"
import ErrorText from "src/components/ErrorText"

interface LoginModalProps {}

const LoginModal: React.SFC<LoginModalProps> = () => {
    const [id, changeId, resetId] = useInput("")
    const [password, changePassword, resetPassword] = useInput("")
    const { loginModalVisible, onHideLoginModal } = useLoginModal()
    const { isLoggingIn, loginErrorMessage, logIn } = useLoginRequest()
    const { me } = useOwnerInfo()

    const checkLoginValidation = useCallback(() => {
        if (!id) {
            return {
                ok: false,
                alertMessage: "아이디를 입력해주세요."
            }
        } else if (!regex.id.test(id)) {
            return {
                ok: false,
                alertMessage: "아이디 형식이 잘못되었습니다."
            }
        } else if (!password) {
            return {
                ok: false,
                alertMessage: "비밀번호를 입력해주세요."
            }
        } else if (!regex.password.test(password)) {
            return {
                ok: false,
                alertMessage: "비밀번호 형식이 잘못되었습니다."
            }
        } else {
            return {
                ok: true
            }
        }
    }, [id, password])

    const submitLoginForm = useCallback(
        async payload => {
            const validation = checkLoginValidation()

            if (!validation.ok) {
                alert(validation.alertMessage)
                return
            }

            logIn(payload)
        },
        [id, password]
    )

    const onClickLogInButton = useCallback(
        event => {
            event.preventDefault()
            event.stopPropagation()

            submitLoginForm({ id, password })
        },
        [id, password]
    )

    const onPressEnter = useCallback(
        event => {
            if (event.key === "Enter") {
                submitLoginForm({ id, password })
            }
        },
        [id, password]
    )

    const resetForm = useCallback(() => {
        resetId()
        resetPassword()
    }, [])

    useEffect(() => {
        if (me && loginModalVisible) {
            alert("로그인에 성공하였습니다.")
            onHideLoginModal()
            resetForm()
        }
    }, [me])

    useEffect(() => {
        if (!loginModalVisible) {
            resetForm()
        }
    }, [loginModalVisible])

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
                onKeyPress={onPressEnter}
            />
            <Button
                title={"로그인"}
                loading={isLoggingIn}
                onClick={onClickLogInButton}
            />
            <ErrorText>{loginErrorMessage}</ErrorText>
        </Modal>
    )
}

export default LoginModal
