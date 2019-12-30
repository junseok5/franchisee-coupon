import * as React from "react"
import styled from "styled-components"

const ErrorText: React.SFC = ({ children }) => {
    return <Container>{children}</Container>
}

export default ErrorText

const Container = styled.div`
    color: #e74c3c;
    font-size: 0.9em;
    font-weight: bold;
    text-align: right;
`
