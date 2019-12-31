import * as React from "react"
import styled from "styled-components"
import Loading from "./Loading"

interface HomeLoadingProps {}

const HomeLoading: React.SFC<HomeLoadingProps> = () => {
    return (
        <Container>
            <Loading />
        </Container>
    )
}

export default HomeLoading

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 300px;
`
