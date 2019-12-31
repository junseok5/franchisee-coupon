import * as React from "react"
import styled from "styled-components"
import { ClipLoader } from "react-spinners"
import { COLORS } from "src/constants"

interface LoadingProps {
    minHeight?: number
}

const Loading: React.SFC<LoadingProps> = ({ minHeight = 0 }) => {
    return (
        <Container minHeight={minHeight}>
            <ClipLoader size={50} color={COLORS.main} />
        </Container>
    )
}

export default Loading

interface StyledProps {
    minHeight: number
}

const Container = styled.div<StyledProps>`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    min-height: ${props => props.minHeight}px;
`
