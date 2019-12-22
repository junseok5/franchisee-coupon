import * as React from "react"
import { useCallback } from "react"
import Input from "src/components/Input"
import Modal from "src/components/Modal"
import useInput from "src/hooks/useInput"
import useRegisterModal from "src/hooks/useRegisterModal"
import Button from "src/components/Button"
import { regex } from "src/constants"
import useRegisterRequest from "src/hooks/useRegisterRequest"
import ErrorText from "src/components/ErrorText"

const RegisterModal: React.SFC = () => {
    const [id, changeId] = useInput("")
    const [password, changePassword] = useInput("")
    const [passwordConfirm, changePasswordConfirm] = useInput("")
    const [email, changeEmail] = useInput("")
    const [name, changeName] = useInput("")
    const { registerModalVisible, onHideRegisterModal } = useRegisterModal()
    const {
        isRegistering,
        // isRegistered,
        registerErrorMessage,
        register
    } = useRegisterRequest()

    const checkRegisterValidation = useCallback(() => {
        if (!id) {
            return {
                isValidate: false,
                alertMessage: "아이디를 입력해주세요."
            }
        } else if (!regex.id.test(id)) {
            return {
                isValidate: false,
                alertMessage:
                    "아이디는 2~30자 사이의 영문 또는 숫자만 입력할 수 있습니다."
            }
        } else if (!password) {
            return {
                isValidate: false,
                alertMessage: "비밀번호를 입력해주세요."
            }
        } else if (!regex.password.test(password)) {
            return {
                isValidate: false,
                alertMessage:
                    "비밀번호는 6~30자 사이의 영문 대소문자 또는 숫자, 특수문자만 입력할 수 있습니다."
            }
        } else if (!passwordConfirm) {
            return {
                isValidate: false,
                alertMessage: "비밀번호 확인란을 입력해주세요."
            }
        } else if (!regex.password.test(passwordConfirm)) {
            return {
                isValidate: false,
                alertMessage:
                    "비밀번호는 6~30자 사이의 영문 대소문자 또는 숫자, 특수문자만 입력할 수 있습니다."
            }
        } else if (password !== passwordConfirm) {
            return {
                isValidate: false,
                alertMessage: "비밀번호가 다릅니다."
            }
        } else if (!email) {
            return {
                isValidate: false,
                alertMessage: "이메일을 입력해주세요."
            }
        } else if (!regex.email.test(email)) {
            return {
                isValidate: false,
                alertMessage: "이메일 형식이 유효하지 않습니다."
            }
        } else if (!name) {
            return {
                isValidate: false,
                alertMessage: "이름을 입력해주세요."
            }
        } else if (!regex.name.test(name)) {
            return {
                isValidate: false,
                alertMessage:
                    "이름은 2~10자 사이의 영문 또는 한글만 입력할 수 있습니다."
            }
        } else {
            return {
                isValidate: true
            }
        }
    }, [id, password, passwordConfirm, email, name])

    const onClickRegisterButton = useCallback(
        event => {
            event.preventDefault()
            event.stopPropagation()

            const validation = checkRegisterValidation()

            if (!validation.isValidate) {
                alert(validation.alertMessage)
                return
            }

            register({ id, password, email, name })
        },
        [id, password, email, name]
    )

    return (
        <Modal
            title={"회원가입"}
            show={registerModalVisible}
            onHideModal={onHideRegisterModal}
        >
            <Input placeholder={"아이디"} value={id} onChange={changeId} />
            <Input
                type={"password"}
                placeholder={"비밀번호"}
                value={password}
                onChange={changePassword}
            />
            <Input
                type={"password"}
                placeholder={"비밀번호 확인"}
                value={passwordConfirm}
                onChange={changePasswordConfirm}
            />
            <Input
                placeholder={"이메일"}
                value={email}
                onChange={changeEmail}
            />
            <Input placeholder={"이름"} value={name} onChange={changeName} />
            <ErrorText>{registerErrorMessage}</ErrorText>
            <Button
                title={"가입하기"}
                onClick={onClickRegisterButton}
                loading={isRegistering}
            />
        </Modal>
    )
}

export default RegisterModal
