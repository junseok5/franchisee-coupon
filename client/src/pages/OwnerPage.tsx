import * as React from "react"
import Header from "src/containers/boxes/Header"
import CheckLogged from "src/containers/etc/CheckLogged"
import Profile from "src/containers/boxes/Profile"
import MyStores from "src/containers/MyStore/MyStores"
import InfoLayout from "src/components/layout/InfoLayout"
import FlexListLayout from "src/components/layout/FlexListLayout"

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
            </CheckLogged>
        </>
    )
}

export default OwnerPage
