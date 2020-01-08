import * as React from "react"
import styled from "styled-components"

const CenterLayout: React.SFC = ({ children }) => {
    return <Container>{children}</Container>
}

export default CenterLayout

const Container = styled.div`
    height: calc(100vh - 4em);
    display: flex;
    justify-content: center;
    align-items: center;
`
