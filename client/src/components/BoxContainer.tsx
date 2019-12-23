import * as React from "react"
import styled from "styled-components"
import { COLORS } from "src/constants"

interface BoxContainerProps {}

const BoxContainer: React.SFC<BoxContainerProps> = ({ children }) => {
    return <Container>{children}</Container>
}

export default BoxContainer

const Container = styled.div`
    padding: 1em;
    margin-top: 1em;
    margin-bottom: 1em;
    border: 1px solid ${COLORS.grayNormal};
    border-radius: 4px;
`
