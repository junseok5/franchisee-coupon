import * as React from "react"
import { Helmet } from "react-helmet"
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
import MainLayout from "src/components/layout/MainLayout"

const HomePage: React.SFC = () => {
    const { storeId } = useParams()
    return (
        <>
            <Header />
            <MainLayout>
                <ListLayout>
                    <CategoryList />
                </ListLayout>
                {storeId && (
                    <ListLayout>
                        <SelectRadius />
                    </ListLayout>
                )}
                <ListLayout>
                    <Advertisements />
                </ListLayout>
            </MainLayout>
            <RegisterModal />
            <LoginModal />
            <SpecialDetailModal />
            <CouponDetailModal />
            <CheckLogged />
            <Helmet>
                <title>In500m</title>
            </Helmet>
        </>
    )
}

export default HomePage
