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
    width: 100%;
    height: ${props => props.height}px;
    padding: 1.5em;
    margin-top: 0.5em;
    margin-bottom: 0.5em;
    border: 1px solid ${COLORS.grayNormal};
    border-radius: 4px;
    background-color: #fff;
`
