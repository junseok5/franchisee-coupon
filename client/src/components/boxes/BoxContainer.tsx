import * as React from "react"
import styled from "styled-components"
import { COLORS } from "src/constants"

interface BoxContainerProps {
    minHeight?: number | string
}

const BoxContainer: React.SFC<BoxContainerProps> = ({
    children,
    minHeight = 300
}) => {
    return <Container minHeight={minHeight}>{children}</Container>
}

export default BoxContainer

interface StyledProps {
    minHeight: number | string
}

const Container = styled.div<StyledProps>`
    width: 100%;
    min-height: ${props => props.minHeight}px;
    padding: 1.5em;
    margin-top: 0.5em;
    margin-bottom: 0.5em;
    border: 1px solid ${COLORS.grayNormal};
    border-radius: 4px;
    background-color: #fff;
`
