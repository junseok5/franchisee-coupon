import * as React from "react"
import styled from "styled-components"
import { COLORS } from "src/constants"
import { FiPlus } from "react-icons/fi"

interface AddButtonProps {
    width?: number
    height?: number
    title: string
    onClick?: () => void
}

const AddButton: React.SFC<AddButtonProps> = ({
    width = 238,
    height = 238,
    title,
    onClick
}) => {
    return (
        <Container width={width} height={height} onClick={onClick}>
            <div className={"wrap"}>
                <div className={"icon"}>
                    <FiPlus size={24} />
                </div>
                <div className={"text"}>{title}</div>
            </div>
        </Container>
    )
}

export default AddButton

interface StyledProps {
    width: number
    height: number
}

const Container = styled.div<StyledProps>`
    width: ${props => props.width}px;
    height: ${props => props.height}px;
    margin: 14px;
    background-color: ${COLORS.grayLight};
    display: flex;
    justify-content: center;
    align-items: center;
    user-select: none;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
        background: ${COLORS.grayLightHover};
    }

    @media screen and (max-width: 768px) {
        width: 100%;
        height: auto;
    }

    .wrap {
        .icon {
            display: flex;
            justify-content: center;
            margin-bottom: 0.5em;
        }
    }
`
