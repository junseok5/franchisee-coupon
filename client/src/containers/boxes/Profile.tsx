import * as React from "react"
import styled from "styled-components"
import useOwnerInfo from "src/hooks/owners/useOwnerInfo"
import Title from "src/components/elements/Title"
import SubTitle from "src/components/elements/SubTitle"
import ColumnLayout from "src/components/layout/ColumnLayout"
import RowLayout from "src/components/layout/RowLayout"
import Text from "src/components/elements/Text"
import { COLORS, PAGE_PATHS, regex } from "src/constants"
import BoxContainer from "src/components/boxes/BoxContainer"
import useLogOut from "src/hooks/owners/useLogOut"
import TextButton from "src/components/elements/TextButton"
import RowBetweenLayout from "src/components/layout/RowBetweenLayout"
import SmallButton from "src/components/elements/SmallButton"
import RowWrap from "src/components/wrap/RowWrap"
import { useParams, useHistory } from "react-router-dom"
import Input from "src/components/elements/Input"
import useInput from "src/hooks/elements/useInput"
import Button from "src/components/elements/Button"
import useUpdateOwnerInfo from "src/hooks/owners/useUpdateOwnerInfo"
import useLogin from "src/hooks/owners/useLogin"
import usePasswordChangeModal from "src/hooks/modal/usePasswordChangeModal"

const Profile: React.SFC = () => {
    const { me, token } = useOwnerInfo()
    const { logOut } = useLogOut()
    const { ownerId } = useParams()
    const history = useHistory()
    const [isUpdateMode, changeIsUpdateMode] = React.useState(false)
    const [name, changeName, , setName] = useInput("")
    const [email, changeEmail, , setEmail] = useInput("")
    const {
        isUpdatingOwnerInfo,
        isUpdatedOwnerInfo,
        updateOwnerInfoErrorMessage,
        updateOwnerInfo
    } = useUpdateOwnerInfo()
    const { checkLogged } = useLogin()
    const { onShowPasswordChangeModal } = usePasswordChangeModal()

    React.useEffect(() => {
        if (me.num !== Number(ownerId)) {
            history.push(`${PAGE_PATHS.OWNER}/${me.num}`)
        }
    }, [])

    React.useEffect(() => {
        if (me) {
            setName(me.name)
            setEmail(me.email)
        }
    }, [me])

    React.useEffect(() => {
        if (isUpdatedOwnerInfo) {
            alert("정보 수정에 성공하였습니다.")
            changeIsUpdateMode(false)
            checkLogged(token)
        }
    }, [isUpdatedOwnerInfo])

    React.useEffect(() => {
        if (updateOwnerInfoErrorMessage) {
            alert(updateOwnerInfoErrorMessage)
        }
    }, [updateOwnerInfoErrorMessage])

    const onClickUpdateButton = React.useCallback(
        (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
            event.preventDefault()
            changeIsUpdateMode(true)
        },
        []
    )

    const onClickUpdateCancelButton = React.useCallback(
        (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
            event.preventDefault()
            changeIsUpdateMode(false)
        },
        []
    )

    const onClickSubmitButton = React.useCallback(
        (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
            event.preventDefault()

            if (!name) {
                alert("이름을 확인해주세요.")
                return
            } else if (!regex.name.test(name)) {
                alert(
                    "이름은 2~10자 사이의 영문 또는 한글만 입력할 수 있습니다."
                )
                return
            } else if (!email) {
                alert("이메일을 확인해주세요.")
                return
            } else if (!regex.email.test(email)) {
                alert("이메일 형식이 유효하지 않습니다.")
                return
            }

            const body = {
                name,
                email
            }

            updateOwnerInfo({ token, id: me.num, body })
        },
        [name, email]
    )

    return (
        <BoxContainer minHeight={200}>
            <ColumnLayout>
                <RowBetweenLayout>
                    <Title>점주 정보</Title>
                    {!isUpdateMode && (
                        <RowLayout>
                            <SmallButton
                                title={"비밀번호 변경"}
                                onClick={onShowPasswordChangeModal}
                            />
                            <SmallButton
                                title={"수정하기"}
                                bgColor={COLORS.grayButton}
                                onClick={onClickUpdateButton}
                            />
                            <TextButton onClick={logOut}>로그아웃</TextButton>
                        </RowLayout>
                    )}
                </RowBetweenLayout>
                <RowLayout>
                    <SubTitle>아이디</SubTitle>
                    <RowWrap>
                        <Text>{me.id}</Text>
                    </RowWrap>
                </RowLayout>
                <RowLayout>
                    <SubTitle>이름</SubTitle>
                    <RowWrap>
                        {isUpdateMode ? (
                            <Input value={name} onChange={changeName} />
                        ) : (
                            <Text>{me.name}</Text>
                        )}
                    </RowWrap>
                </RowLayout>
                <RowLayout>
                    <SubTitle>이메일</SubTitle>
                    <RowWrap>
                        {isUpdateMode ? (
                            <Input value={email} onChange={changeEmail} />
                        ) : (
                            <Text>{me.email}</Text>
                        )}
                    </RowWrap>
                </RowLayout>

                {isUpdateMode && (
                    <RowLayout>
                        <ButtonWrap>
                            <Button
                                title={"확인"}
                                loading={isUpdatingOwnerInfo}
                                onClick={onClickSubmitButton}
                            />
                        </ButtonWrap>
                        <ButtonWrap>
                            <Button
                                title={"취소"}
                                bgColor={COLORS.grayButton}
                                onClick={onClickUpdateCancelButton}
                            />
                        </ButtonWrap>
                    </RowLayout>
                )}
            </ColumnLayout>
        </BoxContainer>
    )
}

export default Profile

const ButtonWrap = styled.div`
    width: 100px;
    margin-right: 14px;
`
