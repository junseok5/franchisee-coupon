import * as React from "react"
import Header from "src/containers/boxes/Header"
import CheckLogged from "src/containers/etc/CheckLogged"
import StoreDetail from "src/containers/store/StoreDetail"
import BizRegModal from "src/containers/modal/BizRegModal"
import MyStoreAdvertisements from "src/containers/MyStoreAdvertisement/MyStoreAdvertisements"

interface StoreDetailPageProps {}

const StoreDetailPage: React.SFC<StoreDetailPageProps> = () => {
    return (
        <>
            <Header />
            <CheckLogged>
                <StoreDetail />
                <MyStoreAdvertisements />
                <BizRegModal />
            </CheckLogged>
        </>
    )
}

export default StoreDetailPage
