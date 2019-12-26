import * as React from "react"
import styled from "styled-components"

interface TextProps {
    color?: string
    size?: number
}

const Text: React.SFC<TextProps> = ({
    children,
    color = "#000",
    size = 15
}) => {
    return (
        <Container color={color} size={size}>
            {children}
        </Container>
    )
}

export default Text

interface StyledProps {
    size: number
}

const Container = styled.div<StyledProps>`
    color: ${props => props.color};
    font-size: ${props => props.size}px;
`
