import * as React from "react"
import { useCallback } from "react"
import styled from "styled-components"
import { COLORS, PAGE_PATHS } from "src/constants"
import { FiPlus } from "react-icons/fi"
import { useHistory } from "react-router-dom"

interface MyStoreAddButtonProps {}

const MyStoreAddButton: React.SFC<MyStoreAddButtonProps> = () => {
    const history = useHistory()

    const goStoreEditorPage = useCallback(() => {
        history.push(PAGE_PATHS.STORE_EDITOR)
    }, [])

    return (
        <Container onClick={goStoreEditorPage}>
            <div className={"wrap"}>
                <div className={"icon"}>
                    <FiPlus size={24} />
                </div>
                <div className={"text"}>가맹점 추가하기</div>
            </div>
        </Container>
    )
}

export default MyStoreAddButton

const Container = styled.div`
    width: 238px;
    height: 238px;
    margin: 14px;
    background-color: ${COLORS.grayLight};
    display: flex;
    justify-content: center;
    align-items: center;
    user-select: none;
    cursor: pointer;
    transition: all 0.2s;

    &:hover {
        background: ${COLORS.grayLightHover};
    }

    @media screen and (max-width: 768px) {
        width: 100%;
        height: auto;
    }

    .wrap {
        .icon {
            display: flex;
            justify-content: center;
            margin-bottom: 0.5em;
        }
    }
`
