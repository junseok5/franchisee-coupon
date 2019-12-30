import * as React from "react"
import Header from "src/containers/boxes/Header"
import CheckLogged from "src/containers/etc/CheckLogged"
// import ListLayout from "src/components/ListLayout"
import Profile from "src/containers/boxes/Profile"
import MyStores from "src/containers/MyStore/MyStores"
import Title from "src/components/elements/Title"
import StoreListLayout from "src/components/layout/StoreListLayout"
import FlexListLayout from "src/components/layout/FlexListLayout"

const OwnerPage: React.SFC = () => {
    return (
        <>
            <Header />
            <CheckLogged>
                <StoreListLayout>
                    <Profile />
                    <Title>내 가맹점</Title>
                    <FlexListLayout>
                        <MyStores />
                    </FlexListLayout>
                </StoreListLayout>
            </CheckLogged>
        </>
    )
}

export default OwnerPage
