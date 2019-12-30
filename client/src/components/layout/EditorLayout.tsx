import * as React from "react"
import styled from "styled-components"

interface EditorLayoutProps {}

const EditorLayout: React.SFC<EditorLayoutProps> = ({ children }) => {
    return (
        <Container>
            <div className={"container-wrap"}>{children}</div>
        </Container>
    )
}

export default EditorLayout

const Container = styled.div`
    display: flex;
    justify-content: center;
    padding: 1em 14px;

    .container-wrap {
        width: 400px;
    }
`
