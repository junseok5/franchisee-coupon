import * as React from "react"
import Header from "src/containers/Header"
import CheckLogged from "src/containers/CheckLogged"
import StoreDetail from "src/containers/StoreDetail"
import BizRegModal from "src/containers/BizRegModal"

interface StoreDetailPageProps {}

const StoreDetailPage: React.SFC<StoreDetailPageProps> = () => {
    return (
        <>
            <Header />
            <CheckLogged>
                <StoreDetail />
                <BizRegModal />
            </CheckLogged>
        </>
    )
}

export default StoreDetailPage
