import * as React from "react"
import ListLayout from "src/components/layout/ListLayout"
import CategoryList from "src/containers/boxes/CategoryList"
import RegisterModal from "src/containers/modal/RegisterModal"
import Header from "src/containers/boxes/Header"
import LoginModal from "src/containers/modal/LoginModal"
import CheckLogged from "src/containers/etc/CheckLogged"
import Advertisements from "src/containers/advertisement/Advertisements"
import SelectRadius from "src/containers/boxes/SelectRadius"
import { useParams } from "react-router-dom"
import SpecialDetailModal from "src/containers/modal/SpecialDetailModal"
import CouponDetailModal from "src/containers/modal/CouponDetailModal"

const HomePage: React.SFC = () => {
    const { storeId } = useParams()
    return (
        <>
            <Header />

            {storeId && (
                <ListLayout>
                    <SelectRadius />
                </ListLayout>
            )}
            <ListLayout>
                <CategoryList />
            </ListLayout>
            <ListLayout>
                <Advertisements />
            </ListLayout>
            <RegisterModal />
            <LoginModal />
            <SpecialDetailModal />
            <CouponDetailModal />
            <CheckLogged />
        </>
    )
}

export default HomePage
