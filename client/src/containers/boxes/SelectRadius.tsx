import * as React from "react"
import styled from "styled-components"
import Select from "src/components/elements/Select"
import useRadius from "src/hooks/etc/useRadius"

interface SelectRadiusProps {}

const SelectRadius: React.SFC<SelectRadiusProps> = () => {
    const { radius, changeRadius } = useRadius()

    return (
        <Container>
            <Select value={radius} onChange={changeRadius}>
                <option value={1000}>1km</option>
                <option value={500}>500m</option>
                <option value={100}>100m</option>
            </Select>
        </Container>
    )
}

export default SelectRadius

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100px;
`
