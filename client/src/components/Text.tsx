import * as React from "react"
import styled from "styled-components"

interface TextProps {
    color?: string
}

const Text: React.SFC<TextProps> = ({ children, color = "#000" }) => {
    return <Container color={color}>{children}</Container>
}

export default Text

const Container = styled.div`
    color: ${props => props.color};
`
