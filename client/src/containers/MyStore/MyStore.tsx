import * as React from "react"
import { useCallback } from "react"
import styled from "styled-components"
import { COLORS, PAGE_PATHS, storageURL } from "src/constants"
import CircleImage from "../../components/elements/CircleImage"
import RowLayout from "../../components/layout/RowLayout"
import { IStore } from "src/store/reducers/store"
import { useHistory } from "react-router-dom"
import getCategoryName from "src/utils/getCategoryName"
import Button from "src/components/elements/Button"
import SubTitle from "src/components/elements/SubTitle"
import ColumnWrap from "src/components/wrap/ColumnWrap"
import RowWrap from "src/components/wrap/RowWrap"
import OneLineText from "src/components/elements/OneLineText"

interface MyStoreProps {
    store: IStore
}

const MyStore: React.SFC<MyStoreProps> = ({ store }) => {
    const history = useHistory()

    const goToStoreDetail = useCallback(() => {
        history.push(`${PAGE_PATHS.STORE_DETAIL}/${store.id}`)
    }, [])

    return (
        <div className={"animated fade-in"}>
            <Container>
                <RowLayout>
                    <CircleImage src={`${storageURL}/stores${store.logoImg}`} />
                    <RowWrap>
                        <SubTitle>{store.name}</SubTitle>
                    </RowWrap>
                </RowLayout>
                <ColumnWrap>
                    <div className={"row"}>
                        <div className={"field"}>업종</div>
                        {getCategoryName(store.category)}
                    </div>
                </ColumnWrap>
                <ColumnWrap>
                    <div className={"row"}>
                        <div className={"field"}>설명</div>
                       <OneLineText>{store.description}</OneLineText> 
                    </div>
                </ColumnWrap>
                <ColumnWrap>
                    <div className={"row"}>
                        <div className={"field"}>주소</div>
                        <OneLineText>{store.address}</OneLineText>
                    </div>
                </ColumnWrap>
                <div className={"button-wrap"}>
                    <Button title={"상세보기"} onClick={goToStoreDetail} />
                </div>
            </Container>
        </div>
    )
}

export default MyStore

const Container = styled.div`
    position: relative;
    width: 230px;
    height: auto;
    padding: 1em 1em 3em 1em;
    margin: 14px 14px 14px 0;
    border: 1px solid ${COLORS.grayLight};
    border-bottom-width: 2px;
    color: ${COLORS.grayTitle};
    transition: all 0.2s;

    @media screen and (max-width: 768px) {
        width: 100%;
        height: auto;
        margin: 0 0 1em 0;
    }

    .row {
        display: flex;
    }

    .field {
        width: 40px;
        font-weight: bold;
    }

    .button-wrap {
        position: absolute;
        bottom: 1em;
        display: flex;
        justify-content: flex-end;
        width: calc(100% - 2em);
        margin-top: 14px;
        font-weight: bold;
    }
`
