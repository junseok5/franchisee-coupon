import * as React from "react"
import CategoryList from "src/components/CategoryList"
import Header from "src/components/Header"

const Home: React.SFC = () => {
    return (
        <div>
            <Header />
            <CategoryList />
        </div>
    )
}

export default Home
