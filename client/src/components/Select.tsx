import * as React from "react"
import styled from "styled-components"
import { COLORS } from 'src/constants'

interface SelectProps {
    value: string | number
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
}

const Select: React.SFC<SelectProps> = ({ children, value, onChange }) => {
    return (
        <Container>
            <select value={value} onChange={onChange}>
                {children}
            </select>
        </Container>
    )
}

export default Select

const Container = styled.div`
    width: 100%;
    margin-top: 0.25em;
    margin-bottom: 0.25em;

    select {
        width: 100%;
        padding: 0.5em 1em;
        border: 1px solid ${COLORS.grayNormal};
        border-radius: 4px;
        outline: none;
        font-size: 1em;
    }
`
