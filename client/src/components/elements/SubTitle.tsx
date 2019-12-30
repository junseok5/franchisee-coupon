import * as React from "react"
import styled from "styled-components"
import { COLORS } from "src/constants"

interface SubTitleProps {
    noHorizontalMargin?: boolean
}

const SubTitle: React.SFC<SubTitleProps> = ({ children }) => {
    return <Container>{children}</Container>
}

export default SubTitle

const Container = styled.div`
    color: ${COLORS.grayTitle};
    font-weight: bold;
    font-size: 1em;
    margin-top: 0.5em;
    margin-bottom: 0.5em;
`
