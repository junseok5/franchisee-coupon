import * as React from "react"
import styled from "styled-components"

interface FlexListLayoutProps {}

const FlexListLayout: React.SFC<FlexListLayoutProps> = ({ children }) => {
    return <Container>{children}</Container>
}

export default FlexListLayout

const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
`
