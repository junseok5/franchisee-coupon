import * as React from "react"
import styled from "styled-components"
import Modal from "src/components/boxes/Modal"
import usePasswordChangeModal from "src/hooks/modal/usePasswordChangeModal"
import useInput from "src/hooks/elements/useInput"
import Input from "src/components/elements/Input"
import RowLayout from "src/components/layout/RowLayout"
import Button from "src/components/elements/Button"
import { COLORS, regex } from "src/constants"
import useUpdateOwnerPassword from "src/hooks/owners/useUpdateOwnerPassword"
import useOwnerInfo from "src/hooks/owners/useOwnerInfo"
import ErrorText from "src/components/elements/ErrorText"

interface PasswordChangeModalProps {}

const PasswordChangeModal: React.SFC<PasswordChangeModalProps> = () => {
    const {
        me: { num },
        token
    } = useOwnerInfo()
    const {
        passwordChangeModalVisible,
        onHidePasswordChangeModal
    } = usePasswordChangeModal()
    const [currentPassword, changeCurrentPassword] = useInput("")
    const [newPassword, changeNewPassword] = useInput("")
    const [newConfirmPassword, changeNewConfirmPassword] = useInput("")
    const {
        isUpdatedOwnerPassword,
        isUpdatingOwnerPassword,
        updateOwnerPasswordErrorMessage,
        updateOwnerPassword
    } = useUpdateOwnerPassword()

    React.useEffect(() => {
        if (isUpdatedOwnerPassword) {
            alert("비밀번호를 성공적으로 변경하였습니다.")
            onHidePasswordChangeModal()
        }
    }, [isUpdatedOwnerPassword])

    const onClickSubmitButton = React.useCallback(() => {
        if (!currentPassword) {
            alert("현재 비밀번호를 입력해주세요.")
            return
        } else if (!newPassword) {
            alert("새 비밀번호를 입력해주세요.")
            return
        } else if (!regex.password.test(newPassword)) {
            alert("새 비밀번호 형식이 잘못되었습니다.")
            return
        } else if (!newConfirmPassword) {
            alert("새 비밀번호 확인을 입력해주세요.")
            return
        } else if (newPassword !== newConfirmPassword) {
            alert("새 비밀번호가 다릅니다.")
            return
        }

        const body = {
            currentPassword,
            newPassword
        }

        updateOwnerPassword({ id: num, token, body })
    }, [currentPassword, newPassword, newConfirmPassword])

    return (
        <Modal
            title={"비밀번호 변경"}
            show={passwordChangeModalVisible}
            onHideModal={onHidePasswordChangeModal}
        >
            <Input
                type={"password"}
                placeholder={"현재 비밀번호"}
                value={currentPassword}
                onChange={changeCurrentPassword}
            />
            <Input
                type={"password"}
                placeholder={"새 비밀번호"}
                value={newPassword}
                onChange={changeNewPassword}
            />
            <Input
                type={"password"}
                placeholder={"새 비밀번호 확인"}
                value={newConfirmPassword}
                onChange={changeNewConfirmPassword}
            />
            <ErrorText>{updateOwnerPasswordErrorMessage}</ErrorText>
            <RowLayout>
                <ButtonWrap>
                    <Button
                        title={"확인"}
                        loading={isUpdatingOwnerPassword}
                        onClick={onClickSubmitButton}
                    />
                </ButtonWrap>
                <ButtonWrap>
                    <Button
                        title={"취소"}
                        bgColor={COLORS.grayButton}
                        onClick={onHidePasswordChangeModal}
                    />
                </ButtonWrap>
            </RowLayout>
        </Modal>
    )
}

export default PasswordChangeModal

const ButtonWrap = styled.div`
    width: 100%;
    margin-left: 8px;
    margin-right: 8px;
`
