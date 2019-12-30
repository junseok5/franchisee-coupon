import * as React from "react"
import styled from "styled-components"

interface TitleProps {
    noHorizontalMargin?: boolean
}

const Title: React.SFC<TitleProps> = ({
    children,
    noHorizontalMargin = false
}) => {
    return (
        <Container noHorizontalMargin={noHorizontalMargin}>
            {children}
        </Container>
    )
}

export default Title

interface StyledProps {
    noHorizontalMargin: boolean
}

const Container = styled.div<StyledProps>`
    font-weight: bold;
    font-size: 1.2em;
    margin: 0.5em ${props => (props.noHorizontalMargin ? 0 : 14)}px;
`
