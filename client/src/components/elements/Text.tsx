import * as React from "react"
import styled from "styled-components"
import { COLORS } from "src/constants"

interface TextProps {
    color?: string
    size?: number
    noMargin?: boolean
}

const Text: React.SFC<TextProps> = ({
    children,
    color = COLORS.grayTitle,
    size = 15,
    noMargin = true
}) => {
    return (
        <Container color={color} size={size} noMargin={noMargin}>
            {children}
        </Container>
    )
}

export default Text

interface StyledProps {
    size: number
    noMargin: boolean
}

const Container = styled.div<StyledProps>`
    color: ${props => props.color};
    font-size: ${props => props.size}px;
    margin: ${props => (props.noMargin ? 0 : "0 14px 0.5em 14px")};
`
