import * as React from "react"
import styled from "styled-components"
import { COLORS } from "src/constants"

interface SmallButtonProps {
    title: string
    bgColor?: string
    onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
}

const SmallButton: React.SFC<SmallButtonProps> = ({
    title,
    bgColor = COLORS.main,
    onClick
}) => {
    return (
        <Container bgColor={bgColor} onClick={onClick}>
            {title}
        </Container>
    )
}

export default SmallButton

interface StyledProps {
    bgColor: string
}

const Container = styled.div<StyledProps>`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${props => props.bgColor};
    padding: 0.6em 1.2em;
    margin-left: 0.4em;
    margin-right: 0.4em;
    color: white;
    font-size: 14px;
    font-weight: bold;
    border-radius: 2px;
    user-select: none;
    cursor: pointer;
`
