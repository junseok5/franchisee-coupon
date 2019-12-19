import * as React from "react"
import Header from "src/components/Header"
import ListLayout from "src/components/ListLayout"
import CategoryList from "src/containers/CategoryList"
import RegisterModal from "src/containers/RegisterModal"

const Home: React.SFC = () => {
    return (
        <>
            <Header />
            <ListLayout>
                <CategoryList />
            </ListLayout>
            <RegisterModal />
        </>
    )
}

export default Home
