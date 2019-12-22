import * as React from "react"
import styled from "styled-components"
import { COLORS } from "src/constants"

interface HeaderLayoutProps {}

const HeaderLayout: React.SFC<HeaderLayoutProps> = ({ children }) => {
    return <Container>{children}</Container>
}

export default HeaderLayout

const Container = styled.div`
    height: 5em;
    border-bottom: 1px solid gray;
    display: flex;
    align-items: center;

    .left {
        display: flex;
        flex: 1;
        justify-content: flex-start;
        margin-left: 5em;

        @media screen and (max-width: 768px) {
            margin-left: 0.5em;
        }
    }

    .right {
        display: flex;
        flex: 1;
        justify-content: flex-end;
        margin-right: 5em;

        @media screen and (max-width: 768px) {
            margin-right: 0.5em;
        }

        span {
            color: ${COLORS.main};
            font-weight: bold;
        }

        .text {
            margin-left: 0.5em;
            margin-right: 0.5em;
            font-size: 0.9em;
            cursor: pointer;
        }
    }
`
