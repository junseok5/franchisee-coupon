import * as React from "react"
import Header from "src/containers/Header"
import CheckLogged from "src/containers/CheckLogged"
// import ListLayout from "src/components/ListLayout"
import Profile from "src/containers/Profile"
import MyStores from "src/containers/MyStores"
import Title from "src/components/Title"
import StoreListLayout from "src/components/StoreListLayout"
import FlexListLayout from "src/components/FlexListLayout"

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
