import * as React from "react"
import styled from "styled-components"

interface SubTitleProps {}

const SubTitle: React.SFC<SubTitleProps> = ({ children }) => {
    return <Container>{children}</Container>
}

export default SubTitle

const Container = styled.div`
    font-weight: bold;
    font-size: 1em;
    margin: 0.5em 14px;
`
