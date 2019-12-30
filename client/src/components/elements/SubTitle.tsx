import * as React from "react"
import styled from "styled-components"

interface SubTitleProps {
    noHorizontalMargin?: boolean
}

const SubTitle: React.SFC<SubTitleProps> = ({
    children,
    noHorizontalMargin = false
}) => {
    return (
        <Container noHorizontalMargin={noHorizontalMargin}>
            {children}
        </Container>
    )
}

export default SubTitle

interface StyledProps {
    noHorizontalMargin: boolean
}

const Container = styled.div<StyledProps>`
    font-weight: bold;
    font-size: 1em;
    margin: 0.5em ${props => (props.noHorizontalMargin ? 0 : 14)}px;
`
