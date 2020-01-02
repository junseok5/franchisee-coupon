import * as React from "react"
import { Helmet } from "react-helmet"
import Header from "src/containers/boxes/Header"
import CheckLogged from "src/containers/etc/CheckLogged"
import Profile from "src/containers/boxes/Profile"
import MyStores from "src/containers/MyStore/MyStores"
import InfoLayout from "src/components/layout/InfoLayout"
import FlexListLayout from "src/components/layout/FlexListLayout"
import PasswordChangeModal from "src/containers/modal/PasswordChangeModal"

const OwnerPage: React.SFC = () => {
    return (
        <>
            <Header />
            <CheckLogged>
                <InfoLayout>
                    <Profile />
                    <FlexListLayout>
                        <MyStores />
                    </FlexListLayout>
                </InfoLayout>
                <PasswordChangeModal />
            </CheckLogged>
            <Helmet>
                <title>내 가맹점 관리</title>
            </Helmet>
        </>
    )
}

export default OwnerPage
