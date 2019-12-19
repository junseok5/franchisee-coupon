import * as React from "react"
import styled from "styled-components"
import { COLORS } from "src/constants"

interface InputProps {
    placeholder?: string
    value: string
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const Input: React.SFC<InputProps> = ({ placeholder, value, onChange }) => {
    return (
        <InputStyle
            placeholder={placeholder}
            value={value}
            onChange={onChange}
        />
    )
}

export default Input

const InputStyle = styled.input`
    width: 280px;
    padding: 0.5em 1em;
    margin-top: 0.25em;
    margin-bottom: 0.25em;
    border: 1px solid ${COLORS.grayNormal};
    border-radius: 4px;
    font-size: 1em;
`
