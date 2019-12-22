import * as React from "react"
import ListLayout from "src/components/ListLayout"
import CategoryList from "src/containers/CategoryList"
import RegisterModal from "src/containers/RegisterModal"
import Header from "src/containers/Header"
import LoginModal from "src/containers/LoginModal"

const Home: React.SFC = () => {
    return (
        <>
            <Header />
            <ListLayout>
                <CategoryList />
            </ListLayout>
            <RegisterModal />
            <LoginModal />
        </>
    )
}

export default Home
