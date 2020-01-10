import * as React from "react"
import styled from "styled-components"

interface OneLineTextProps {
    size?: number
}

const OneLineText: React.SFC<OneLineTextProps> = ({ children, size = 15 }) => {
    return <Container size={size}>{children}</Container>
}

export default OneLineText

interface StyledProps {
    size: number
}

const Container = styled.div<StyledProps>`
    width: calc(100% - 5em);
    font-size: ${props => props.size}px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`
