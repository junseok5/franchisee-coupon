import * as React from "react"
import styled from "styled-components"
import { COLORS } from "src/constants"

interface SmallReverseButtonProps {
    title: string
    color?: string
    onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
}

const SmallReverseButton: React.SFC<SmallReverseButtonProps> = ({
    title,
    color = COLORS.main,
    onClick
}) => {
    return (
        <Container color={color} onClick={onClick}>
            {title}
        </Container>
    )
}

export default SmallReverseButton

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: white;
    border: 1px solid ${props => props.color};
    border-radius: 20px;
    padding: 0.6em 1.5em;
    margin-left: 0.4em;
    margin-right: 0.4em;
    color: ${props => props.color};
    font-size: 14px;
    font-weight: bold;
    user-select: none;
    cursor: pointer;
`
