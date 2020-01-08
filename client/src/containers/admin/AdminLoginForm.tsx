import * as React from "react"
import styled from "styled-components"
import Input from "src/components/elements/Input"
import useInput from "src/hooks/elements/useInput"
import Title from "src/components/elements/Title"
import { COLORS } from "src/constants"
import Button from "src/components/elements/Button"
import useAdminLogin from "src/hooks/admin/useAdminLogin"
import ErrorText from "src/components/elements/ErrorText"

interface AdminLoginFormProps {}

const AdminLoginForm: React.SFC<AdminLoginFormProps> = () => {
    const [adminId, changeAdminId] = useInput("")
    const [adminPassword, changeAdminPassword] = useInput("")
    const {
        isAdminLoggedIn,
        isAdminLoggingIn,
        adminLoginErrorMessage,
        adminLogIn
    } = useAdminLogin()

    React.useEffect(() => {
        if (isAdminLoggedIn) {
            alert("로그인에 성공하였습니다.")
        }
    }, [isAdminLoggedIn])

    const submit = React.useCallback(() => {
        if (!adminId) {
            alert("아이디를 입력해주세요.")
            return
        } else if (!adminPassword) {
            alert("비밀번호를 입력해주세요.")
            return
        }

        adminLogIn({ id: adminId, password: adminPassword })
    }, [adminId, adminPassword])

    const onKeyPressEnter = React.useCallback(
        (event: React.KeyboardEvent<HTMLInputElement>) => {
            if (event.key === "Enter") {
                submit()
            }
        },
        [adminId, adminPassword]
    )

    const onClickLogInButton = React.useCallback(
        (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
            event.preventDefault()
            submit()
        },
        [adminId, adminPassword]
    )

    return (
        <Container>
            <Title>로그인</Title>
            <Input
                placeholder={"아이디"}
                value={adminId}
                onChange={changeAdminId}
            />
            <Input
                type={"password"}
                placeholder={"비밀번호"}
                value={adminPassword}
                onChange={changeAdminPassword}
                onKeyPress={onKeyPressEnter}
            />
            <ErrorText>{adminLoginErrorMessage}</ErrorText>
            <Button
                title={"로그인"}
                loading={isAdminLoggingIn}
                onClick={onClickLogInButton}
            />
        </Container>
    )
}

export default AdminLoginForm

const Container = styled.div`
    padding: 1em;
    background-color: #fff;
    border: 1px solid ${COLORS.border};
    border-radius: 4px;
`
