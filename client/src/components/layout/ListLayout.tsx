import * as React from "react"
import styled from "styled-components"

const ListLayout: React.SFC = ({ children }) => {
    return <Styled>{children}</Styled>
}

export default ListLayout

const Styled = styled.div`
    padding: 1em;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
`
