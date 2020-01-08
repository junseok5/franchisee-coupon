import * as React from "react"
import useLoadVerificationStores from "src/hooks/admin/useLoadVerificationStores"
import BoxContainer from "src/components/boxes/BoxContainer"
import VerificationStore from "./VerificationStore"
import Loading from "src/components/etc/Loading"

interface VerificationStoresProps {}

const VerificationStores: React.SFC<VerificationStoresProps> = () => {
    const {
        isLoadingVerificationStores,
        loadVerificationStores,
        verificationStores
    } = useLoadVerificationStores()

    React.useEffect(() => {
        loadVerificationStores()
    }, [])

    return (
        <BoxContainer>
            {isLoadingVerificationStores ? (
                <Loading />
            ) : (
                verificationStores.map(store => (
                    <VerificationStore store={store} />
                ))
            )}
        </BoxContainer>
    )
}

export default VerificationStores
