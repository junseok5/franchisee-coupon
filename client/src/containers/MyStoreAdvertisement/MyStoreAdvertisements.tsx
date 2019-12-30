import * as React from "react"
import { useEffect } from "react"
import Title from "src/components/elements/Title"
import MyStoreAdvertisementAddButton from "../elements/MyStoreAdvertisementAddButton"
import useLoadStoreAdvertisements from "src/hooks/advertisement/useLoadStoreAdvertisements"
import MyStoreAdvertisement from "src/containers/MyStoreAdvertisement/MyStoreAdvertisement"
import Loading from "src/components/etc/Loading"
import useOwnerInfo from "src/hooks/owners/useOwnerInfo"
import { useParams } from "react-router-dom"
import MyStoreAdvertisementsLayout from "src/components/layout/MyStoreAdvertisementsLayout"

const MyStoreAdvertisements: React.SFC = () => {
    const {
        isLoadingStoreAdvertisements,
        storeAdvertisements,
        loadStoreAdvertisements
    } = useLoadStoreAdvertisements()
    const { token } = useOwnerInfo()
    const { id } = useParams()

    useEffect(() => {
        loadStoreAdvertisements({ storeId: id, token })
    }, [])

    return (
        <>
            {isLoadingStoreAdvertisements ? (
                <Loading />
            ) : (
                <>
                    <Title>등록한 광고</Title>
                    <MyStoreAdvertisementsLayout>
                        <MyStoreAdvertisementAddButton />
                        {storeAdvertisements.map(advertisement => (
                            <MyStoreAdvertisement
                                key={advertisement.id}
                                advertisement={advertisement}
                            />
                        ))}
                    </MyStoreAdvertisementsLayout>
                </>
            )}
        </>
    )
}

export default MyStoreAdvertisements
