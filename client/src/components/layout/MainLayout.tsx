import * as React from "react"
import styled from "styled-components"

interface MainLayoutProps {}

const MainLayout: React.SFC<MainLayoutProps> = ({ children }) => {
    return <Container>{children}</Container>
}

export default MainLayout

const Container = styled.div`
    width: 100%;
    height: calc(100vh - 4em);
    background-color: #fff;
`
