import * as React from "react"
import styled from "styled-components"

interface ErrorTextProps {}

const ErrorText: React.SFC<ErrorTextProps> = ({ children }) => {
    return <Container>{children}</Container>
}

export default ErrorText

const Container = styled.div`
    color: #e74c3c;
    font-size: 0.9em;
`
