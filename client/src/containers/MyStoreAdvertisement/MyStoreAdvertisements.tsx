import * as React from "react"
import { useEffect } from "react"
import Title from "src/components/elements/Title"
import useLoadStoreAdvertisements from "src/hooks/advertisement/useLoadStoreAdvertisements"
import MyStoreAdvertisement from "src/containers/MyStoreAdvertisement/MyStoreAdvertisement"
import Loading from "src/components/etc/Loading"
import useOwnerInfo from "src/hooks/owners/useOwnerInfo"
import { useParams, useHistory } from "react-router-dom"
import MyStoreAdvertisementsLayout from "src/components/layout/MyStoreAdvertisementsLayout"
import BoxContainer from "src/components/boxes/BoxContainer"
import RowBetweenLayout from "src/components/layout/RowBetweenLayout"
import TextButton from "src/components/elements/TextButton"
import { PAGE_PATHS } from "src/constants"
import useLoadStore from "src/hooks/store/useLoadStore"
import ErrorNotice from "src/components/boxes/ErrorNotice"

const MyStoreAdvertisements: React.SFC = () => {
    const {
        isLoadingStoreAdvertisements,
        storeAdvertisements,
        loadStoreAdvertisements
    } = useLoadStoreAdvertisements()
    const { token } = useOwnerInfo()
    const { storeId } = useParams()
    const { store } = useLoadStore()
    const history = useHistory()

    useEffect(() => {
        if (storeId) {
            loadStoreAdvertisements({ storeId, token })
        }
    }, [])

    const goToAdvertisementEditor = React.useCallback(() => {
        if (store?.verificationStore?.status !== "ACCEPTED") {
            alert("사업자 인증이 필요합니다.")
            return
        }
        history.push(`${PAGE_PATHS.ADVERTISEMENT_EDITOR}/stores/${storeId}`)
    }, [store])

    return (
        <BoxContainer minHeight={500}>
            <RowBetweenLayout>
                <Title>등록한 광고</Title>
                <TextButton onClick={goToAdvertisementEditor}>
                    + 광고 등록
                </TextButton>
            </RowBetweenLayout>

            {isLoadingStoreAdvertisements ? (
                <Loading minHeight={300} />
            ) : storeAdvertisements.length ? (
                <>
                    <MyStoreAdvertisementsLayout>
                        {storeAdvertisements.map(advertisement => (
                            <MyStoreAdvertisement
                                key={advertisement.id}
                                advertisement={advertisement}
                            />
                        ))}
                    </MyStoreAdvertisementsLayout>
                </>
            ) : (
                <ErrorNotice>등록된 광고가 없습니다.</ErrorNotice>
            )}
        </BoxContainer>
    )
}

export default MyStoreAdvertisements
