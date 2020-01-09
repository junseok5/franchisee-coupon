import * as React from "react"
import styled from "styled-components"
import { IStore } from "src/store/reducers/store"
import CircleImage from "../../components/elements/CircleImage"
import { storageURL, COLORS } from "src/constants"
import SubTitle from "../../components/elements/SubTitle"
import Image from "../../components/elements/Image"
import Button from "src/components/elements/Button"
import RowLayout from "src/components/layout/RowLayout"
import RowWrap from "src/components/wrap/RowWrap"
import useUpdateVerificationStore from "src/hooks/admin/useUpdateVerificationStore"
import useAdminLogin from "src/hooks/admin/useAdminLogin"
import useLoadVerificationStores from "src/hooks/admin/useLoadVerificationStores"

interface VerificationStoreProps {
    store: IStore
}

const VerificationStore: React.SFC<VerificationStoreProps> = ({ store }) => {
    const {
        isUpdatedVerificationStore,
        updateVerificationStoreErrorMessage,
        updateVerificationStore
    } = useUpdateVerificationStore()
    const { adminToken } = useAdminLogin()
    const { loadVerificationStores } = useLoadVerificationStores()

    React.useEffect(() => {
        if (updateVerificationStoreErrorMessage) {
            alert(updateVerificationStoreErrorMessage)
        }
    }, [updateVerificationStoreErrorMessage])

    React.useEffect(() => {
        if (isUpdatedVerificationStore && adminToken) {
            alert("인증 수락에 성공하였습니다.")
            loadVerificationStores(adminToken)
        }
    }, [isUpdatedVerificationStore])

    const onClickAcceptButton = React.useCallback(() => {
        if (adminToken) {
            updateVerificationStore({
                id: store.id,
                status: "ACCEPTED",
                token: adminToken
            })
        }
    }, [store])

    return (
        <Container>
            <div className={"header"}>
                <RowLayout>
                    <CircleImage src={`${storageURL}/stores${store.logoImg}`} />
                    <RowWrap>
                        <SubTitle>{store.name}</SubTitle>
                    </RowWrap>
                </RowLayout>
            </div>
            <div className={"biz-reg-img"}>
                <Image
                    src={`${storageURL}/stores${store.verificationStore?.bizRegImg}`}
                    width={"100%"}
                    height={"auto"}
                />
            </div>
            <Button
                title={"인증 수락"}
                onClick={onClickAcceptButton}
            />
        </Container>
    )
}

export default VerificationStore

const Container = styled.div`
    width: 320px;
    padding: 1em;
    margin-top: 1em;
    margin-right: 1em;
    border: 1px solid ${COLORS.border};
    border-radius: 4px;
    border-bottom-width: 2px;
`
