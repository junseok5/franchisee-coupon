import * as React from "react"
import styled from "styled-components"
import { COLORS } from "src/constants"

interface TextButtonProps {
    color?: string
    noMargin?: boolean
    onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
}

const TextButton: React.SFC<TextButtonProps> = ({
    children,
    noMargin = false,
    color = COLORS.grayNormal,
    onClick
}) => {
    return (
        <Container noMargin={noMargin} color={color} onClick={onClick}>
            {children}
        </Container>
    )
}

export default TextButton

interface StyledProps {
    noMargin: boolean
}

const Container = styled.div<StyledProps>`
    margin-left: ${props => (props.noMargin ? 0 : "1em")};
    margin-right: ${props => (props.noMargin ? 0 : "1em")};
    color: ${props => props.color};
    font-size: 0.9em;
    cursor: pointer;
    user-select: none;
`
