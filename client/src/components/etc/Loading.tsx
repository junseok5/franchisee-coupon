import * as React from "react"
import styled from "styled-components"
import { ClipLoader } from "react-spinners"
import { COLORS } from "src/constants"

interface LoadingProps {}

const Loading: React.SFC<LoadingProps> = () => {
    return (
        <Container>
            <ClipLoader size={50} color={COLORS.main} />
        </Container>
    )
}

export default Loading

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
`
