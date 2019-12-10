import * as React from "react"
import styled from "styled-components"

const Header: React.SFC = () => {
    return (
        <Styled>
            <header>
                <div className="left">Logo</div>
                <div className="right">
                    <div className="text">로그인</div>
                    <div className="text">회원가입</div>
                </div>
            </header>
        </Styled>
    )
}

export default Header

const Styled = styled.div`
    header {
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

            .text {
                margin-left: 0.5em;
                margin-right: 0.5em;
                font-size: 0.9em;
            }
        }
    }
`
