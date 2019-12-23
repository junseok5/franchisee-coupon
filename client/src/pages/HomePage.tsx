import * as React from "react"
import ListLayout from "src/components/ListLayout"
import CategoryList from "src/containers/CategoryList"
import RegisterModal from "src/containers/RegisterModal"
import Header from "src/containers/Header"
import LoginModal from "src/containers/LoginModal"
import CheckLogged from "src/containers/CheckLogged"

const HomePage: React.SFC = () => {
    return (
        <>
            <Header />
            <ListLayout>
                <CategoryList />
            </ListLayout>
            <RegisterModal />
            <LoginModal />
            <CheckLogged />
        </>
    )
}

export default HomePage
