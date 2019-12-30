import * as React from "react"
import styled from "styled-components"
import { COLORS } from "src/constants"

interface CircleImageProps {
    src: string
    alt?: string
    width?: number
    height?: number
}

const CircleImage: React.SFC<CircleImageProps> = ({
    src,
    alt,
    width = 40,
    height = 40
}) => {
    return (
        <Container width={width} height={height}>
            <img src={src} alt={alt} draggable={false} />
        </Container>
    )
}

export default CircleImage

interface StyledProps {
    width?: number
    height?: number
}

const Container = styled.div<StyledProps>`
    width: ${props => props.width}px;
    height: ${props => props.height}px;
    border: 1px solid ${COLORS.grayNormal};
    border-radius: 50%;
    overflow: hidden;

    img {
        width: 100%;
        height: 100%;
    }
`
