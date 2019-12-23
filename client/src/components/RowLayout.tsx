import * as React from "react"
import styled from "styled-components"

interface RowLayoutProps {}

const RowLayout: React.SFC<RowLayoutProps> = ({ children }) => {
    return <Container>{children}</Container>
}

export default RowLayout

const Container = styled.div`
    display: flex;
    align-items: center;
`
