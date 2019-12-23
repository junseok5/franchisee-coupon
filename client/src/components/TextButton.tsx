import * as React from "react"
import styled from "styled-components"
import { COLORS } from "src/constants"

interface TextButtonProps {
    onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
}

const TextButton: React.SFC<TextButtonProps> = ({ children, onClick }) => {
    return <Container onClick={onClick}>{children}</Container>
}

export default TextButton

const Container = styled.div`
    margin-left: 1em;
    margin-right: 1em;
    color: ${COLORS.grayNormal};
    font-size: 0.9em;
    cursor: pointer;
    user-select: none;
`
