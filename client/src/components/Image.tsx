import * as React from "react"
import styled from "styled-components"

interface ImageProps {
    src: string
    alt?: string
    width?: number
    height?: number
}

const Image: React.SFC<ImageProps> = ({
    src,
    alt,
    width = 100,
    height = 100
}) => {
    return (
        <Container width={width} height={height}>
            <img src={src} alt={alt} />
        </Container>
    )
}

export default Image

interface StyledProps {
    width: number
    height: number
}

const Container = styled.div<StyledProps>`
    width: ${props => props.width}px;
    height: ${props => props.height}px;
    margin-top: 1em;
    margin-bottom: 1em;
    border-radius: 4px;
    overflow: hidden;

    img {
        width: 100%;
        height: 100%;
    }
`
