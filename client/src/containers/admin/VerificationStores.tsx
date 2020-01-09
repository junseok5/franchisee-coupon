import * as React from "react"
import useLoadVerificationStores from "src/hooks/admin/useLoadVerificationStores"
import BoxContainer from "src/components/boxes/BoxContainer"
import VerificationStore from "./VerificationStore"
import Loading from "src/components/etc/Loading"
import useAdminLogin from "src/hooks/admin/useAdminLogin"
import Title from "src/components/elements/Title"
import FlexListLayout from "src/components/layout/FlexListLayout"
import ErrorNotice from "src/components/boxes/ErrorNotice"

interface VerificationStoresProps {}

const VerificationStores: React.SFC<VerificationStoresProps> = () => {
    const {
        isLoadingVerificationStores,
        loadVerificationStores,
        verificationStores
    } = useLoadVerificationStores()
    const { adminToken } = useAdminLogin()

    React.useEffect(() => {
        if (adminToken) {
            loadVerificationStores(adminToken)
        }
    }, [])

    return (
        <BoxContainer>
            <Title>사업자 인증 요청 중인 가맹점</Title>

            {isLoadingVerificationStores ? (
                <Loading />
            ) : verificationStores.length ? (
                verificationStores.map(store => (
                    <FlexListLayout key={store.id}>
                        <VerificationStore store={store} />
                    </FlexListLayout>
                ))
            ) : (
                <ErrorNotice>인증 요청 중인 가맹점이 없습니다.</ErrorNotice>
            )}
        </BoxContainer>
    )
}

export default VerificationStores
