import * as React from "react"
import styled from "styled-components"

interface ColumnLayoutProps {}

const ColumnLayout: React.SFC<ColumnLayoutProps> = ({ children }) => {
    return <Container>{children}</Container>
}

export default ColumnLayout

const Container = styled.div`
    display: flex;
    flex-direction: column;
`
