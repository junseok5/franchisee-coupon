import * as React from "react"
import styled from "styled-components"

interface InfoLayoutProps {}

const InfoLayout: React.SFC<InfoLayoutProps> = ({ children }) => {
    return (
        <Container>
            <div className={"container-wrap"}>{children}</div>
        </Container>
    )
}

export default InfoLayout

const Container = styled.div`
    display: flex;
    justify-content: center;

    .container-wrap {
        width: 800px;
        margin-top: 1em;

        @media screen and (max-width: 768px) {
            width: 100%;
        }
    }
`
