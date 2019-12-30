import * as React from "react"
import styled from "styled-components"

interface CategoryProps {
    icon: React.ReactNode
    name: string
    bgColor?: string
    onClick?: () => void
}

const Category: React.SFC<CategoryProps> = ({
    icon,
    name,
    bgColor = "#fe8c52",
    onClick
}) => {
    return (
        <Styled bgColor={bgColor} onClick={onClick}>
            <div className="icon">{icon}</div>
            <div className="name">{name}</div>
        </Styled>
    )
}

export default Category

interface StyledProps {
    bgColor?: string
}

const Styled = styled.div<StyledProps>`
    width: 80px;
    margin-top: 0.5em;
    margin-bottom: 0.5em;
    user-select: none;
    cursor: pointer;

    .icon {
        width: 40px;
        height: 40px;
        margin: 0.2em auto;
        border-radius: 50%;
        background: ${props => props.bgColor};
        font-size: 1.5em;
        color: white;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .name {
        text-align: center;
        font-size: 0.8em;
    }
`
