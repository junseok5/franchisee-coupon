import * as React from "react"
import Header from "src/containers/boxes/Header"
import CheckLogged from "src/containers/etc/CheckLogged"
import StoreDetail from "src/containers/store/StoreDetail"
import BizRegModal from "src/containers/modal/BizRegModal"
import MyStoreAdvertisements from "src/containers/MyStoreAdvertisement/MyStoreAdvertisements"
import InfoLayout from "src/components/layout/InfoLayout"

interface StoreDetailPageProps {}

const StoreDetailPage: React.SFC<StoreDetailPageProps> = () => {
    return (
        <>
            <Header />
            <CheckLogged>
                <InfoLayout>
                    <StoreDetail />
                    <MyStoreAdvertisements />
                </InfoLayout>
                <BizRegModal />
            </CheckLogged>
        </>
    )
}

export default StoreDetailPage
