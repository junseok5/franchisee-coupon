import * as React from "react"
import styled from "styled-components"

const RowBetweenLayout: React.SFC = ({ children }) => {
    return <Container>{children}</Container>
}

export default RowBetweenLayout

const Container = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`
