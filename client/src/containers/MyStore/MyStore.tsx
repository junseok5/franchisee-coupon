import * as React from "react"
import { useCallback } from "react"
import styled from "styled-components"
import { COLORS, PAGE_PATHS } from "src/constants"
import CircleImage from "../../components/elements/CircleImage"
import RowLayout from "../../components/layout/RowLayout"
import { IStore } from "src/store/reducers/store"
import { useHistory } from "react-router-dom"
import getCategoryName from "src/utils/getCategoryName"
import Button from "src/components/elements/Button"
import SubTitle from "src/components/elements/SubTitle"
import ColumnWrap from "src/components/wrap/ColumnWrap"
import RowWrap from "src/components/wrap/RowWrap"

interface MyStoreProps {
    store: IStore
}

const MyStore: React.SFC<MyStoreProps> = ({ store }) => {
    const history = useHistory()
    // const {
    //     token,
    //     me: { num }
    // } = useOwnerInfo()
    // const { loadMyStores } = useMyStores()
    // const { storeRemoved, removeStore } = useRemoveStore()

    // React.useEffect(() => {
    //     if (storeRemoved) {
    //         loadMyStores({ token, id: num })
    //     }
    // }, [storeRemoved])

    const goToStoreDetail = useCallback(() => {
        history.push(`${PAGE_PATHS.STORE_DETAIL}/${store.id}`)
    }, [])

    // const onClickStoreRemoveButton = useCallback(() => {
    //     const confirmRemove = confirm("정말로 가맹점을 삭제하시겠습니까?")

    //     if (confirmRemove) {
    //         removeStore({ token, id: store.id })
    //     }
    // }, [])

    return (
        <Container>
            <RowLayout>
                <CircleImage
                    src={`http://localhost:5000/uploads/stores${store.logoImg}`}
                />
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
                    {store.description}
                </div>
            </ColumnWrap>
            <ColumnWrap>
                <div className={"row"}>
                    <div className={"field"}>주소</div>
                    {store.address}
                </div>
            </ColumnWrap>
            <div className={"button-wrap"}>
                <Button title={"상세보기"} onClick={goToStoreDetail} />
            </div>
        </Container>
    )
}

export default MyStore

const Container = styled.div`
    position: relative;
    width: 238px;
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
        margin: 0;
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
