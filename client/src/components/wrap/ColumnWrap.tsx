import * as React from "react"
import styled from "styled-components"

interface ColumnWrapProps {}

const ColumnWrap: React.SFC<ColumnWrapProps> = ({ children }) => {
    return <Container>{children}</Container>
}

export default ColumnWrap

const Container = styled.div`
    margin-top: 0.7em;
    margin-bottom: 0.7em;
`
