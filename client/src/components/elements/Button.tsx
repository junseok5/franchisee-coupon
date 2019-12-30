import * as React from "react"
import styled from "styled-components"
import { ClipLoader } from "react-spinners"
import { COLORS } from "src/constants"

interface ButtonProps {
    title: string
    loading?: boolean
    bgColor?: string
    onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
}

const Button: React.SFC<ButtonProps> = ({
    title,
    loading = false,
    bgColor = COLORS.main,
    onClick
}) => {
    return (
        <ButtonStyled bgColor={bgColor} onClick={onClick}>
            {loading ? <ClipLoader size={20} color={"#fff"} /> : title}
        </ButtonStyled>
    )
}

export default Button

interface StyledProps {
    bgColor: string
}

const ButtonStyled = styled.div<StyledProps>`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    padding-top: 0.5em;
    padding-bottom: 0.5em;
    margin-top: 0.5em;
    color: white;
    font-weight: bold;
    border-radius: 4px;
    background-color: ${props => props.bgColor};
    cursor: pointer;
    user-select: none;
    transition: all 0.2s;

    &:hover {
        background-color: ${props =>
            props.bgColor !== COLORS.main ? "none" : COLORS.mainHover};
    }
`
