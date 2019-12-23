import * as React from "react"
import styled from "styled-components"

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

const Container = styled.div``
