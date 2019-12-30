import * as React from "react"
import styled from "styled-components"
import { COLORS } from "src/constants"

interface TitleProps {}

const Title: React.SFC<TitleProps> = ({ children }) => {
    return <Container>{children}</Container>
}

export default Title

const Container = styled.div`
    color: ${COLORS.grayTitle};
    font-weight: bold;
    font-size: 1.4em;
    margin-top: 0.5em;
    margin-bottom: 0.5em;
`
