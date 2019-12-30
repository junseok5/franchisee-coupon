import * as React from "react"
import styled from "styled-components"
import { COLORS } from "src/constants"

interface InputProps {
    type?: string
    placeholder?: string
    value?: string
    disabled?: boolean
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
    onKeyPress?: (event: React.KeyboardEvent<HTMLInputElement>) => void
}

const Input: React.SFC<InputProps> = (props: InputProps) => {
    return (
        <Container>
            <input {...props} />
        </Container>
    )
}

export default Input

const Container = styled.div`
    width: 100%;
    margin-top: 0.25em;
    margin-bottom: 0.25em;

    input {
        width: 100%;
        padding: 0.5em 1em;
        border: 1px solid ${COLORS.grayNormal};
        border-radius: 4px;
        font-size: 1em;
    }
`
