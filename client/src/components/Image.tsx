import * as React from "react"
import styled from "styled-components"

interface ImageProps {
    src: string
    alt?: string
    width?: string
    height?: string
}

const Image: React.SFC<ImageProps> = ({
    src,
    alt,
    width = "100px",
    height = "100px"
}) => {
    return (
        <Container width={width} height={height}>
            <img src={src} alt={alt} />
        </Container>
    )
}

export default Image

interface StyledProps {
    width: string
    height: string
}

const Container = styled.div<StyledProps>`
    width: ${props => props.width};
    height: ${props => props.height};
    margin-top: 1em;
    margin-bottom: 1em;
    border-radius: 4px;
    overflow: hidden;

    img {
        width: 100%;
        height: 100%;
    }
`
