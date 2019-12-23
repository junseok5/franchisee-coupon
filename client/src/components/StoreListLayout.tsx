import * as React from "react"
import styled from "styled-components"

interface StoreListLayoutProps {}

const StoreListLayout: React.SFC<StoreListLayoutProps> = ({ children }) => {
    return (
        <Container>
            <div className={"container-wrap"}>{children}</div>
        </Container>
    )
}

export default StoreListLayout

const Container = styled.div`
    display: flex;
    justify-content: center;

    .container-wrap {
        width: 800px;
    }
`
