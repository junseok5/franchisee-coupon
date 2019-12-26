import * as React from "react"
import styled from "styled-components"
import { COLORS } from "src/constants"

interface BoxContainerProps {
    height?: number | string
}

const BoxContainer: React.SFC<BoxContainerProps> = ({
    children,
    height = "auto"
}) => {
    return <Container height={height}>{children}</Container>
}

export default BoxContainer

interface StyledProps {
    height: number | string
}

const Container = styled.div<StyledProps>`
    height: ${props => props.height}px;
    padding: 1em;
    margin-top: 1em;
    margin-bottom: 1em;
    border: 1px solid ${COLORS.grayNormal};
    border-radius: 4px;
`
