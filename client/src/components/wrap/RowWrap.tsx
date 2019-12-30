import * as React from "react"
import styled from "styled-components"

interface RowWrapProps {}

const RowWrap: React.SFC<RowWrapProps> = ({ children }) => {
    return <Container>{children}</Container>
}

export default RowWrap

const Container = styled.div`
    margin-left: 0.5em;
    margin-right: 0.5em;
`
