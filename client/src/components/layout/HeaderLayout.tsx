import * as React from "react"
import styled from "styled-components"
import { COLORS } from "src/constants"

interface HeaderLayoutProps {}

const HeaderLayout: React.SFC<HeaderLayoutProps> = ({ children }) => {
    return (
        <Container>
            <div className={"header-wrap"}>{children}</div>
        </Container>
    )
}

export default HeaderLayout

const Container = styled.div`
    height: 4em;
    display: flex;
    align-items: center;
    border-bottom: 1px solid ${COLORS.grayNormal};
    background-color: #fff;
    overflow: hidden;

    .header-wrap {
        width: 1080px;
        margin: 0 auto;
        display: flex;
        align-items: center;

        .left {
            display: flex;
            flex: 1;
            justify-content: flex-start;
            font-weight: bold;
            font-size: 1.4em;

            a {
                .logo-img {
                    width: 180px;
                    height: auto;

                    @media screen and (max-width: 1088px) {
                        width: 150px;
                    }

                    img {
                        user-select: none;
                        cursor: pointer;
                    }
                }
            }
        }

        .right {
            display: flex;
            flex: 1;
            justify-content: flex-end;

            @media screen and (max-width: 1088px) {
                margin-right: 0.5em;
                flex: 2;
            }

            span {
                font-weight: bold;
                color: ${COLORS.main};
                cursor: pointer;
            }

            .pc-auth {
                display: flex;

                @media screen and (max-width: 768px) {
                    display: none;
                }
            }

            .mobile-auth {
                display: none;

                @media screen and (max-width: 768px) {
                    display: flex;
                }
            }
        }
    }
`
