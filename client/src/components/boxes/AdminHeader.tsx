import * as React from "react"
import styled from "styled-components"
import Title from "../elements/Title"
import { COLORS } from "src/constants"

const AdminHeader: React.SFC = () => {
    return (
        <Container>
            <Title>관리자 페이지</Title>
        </Container>
    )
}

export default AdminHeader

const Container = styled.div`
    width: 100%;
    height: 4em;
    border-bottom: 1px solid ${COLORS.border};
    background-color: #fff;
    display: flex;
    justify-content: center;
    align-items: center;
`
