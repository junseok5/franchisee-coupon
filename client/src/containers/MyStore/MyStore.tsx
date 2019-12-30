import * as React from "react"
import { useCallback } from "react"
import styled from "styled-components"
import Title from "../../components/elements/Title"
import { COLORS, PAGE_PATHS } from "src/constants"
import CircleImage from "../../components/elements/CircleImage"
import RowLayout from "../../components/layout/RowLayout"
import { IStore } from "src/store/reducers/store"
import { useHistory } from "react-router-dom"
import getCategoryName from "src/utils/getCategoryName"
import TextButton from "src/components/elements/TextButton"
import useRemoveStore from "src/hooks/store/useRemoveStore"
import useOwnerInfo from "src/hooks/owners/useOwnerInfo"
import useMyStores from "src/hooks/owners/useMyStores"

interface MyStoreProps {
    store: IStore
}

const MyStore: React.SFC<MyStoreProps> = ({ store }) => {
    const history = useHistory()
    const {
        token,
        me: { num }
    } = useOwnerInfo()
    const { loadMyStores } = useMyStores()
    const { storeRemoved, removeStore } = useRemoveStore()

    React.useEffect(() => {
        if (storeRemoved) {
            loadMyStores({ token, id: num })
        }
    }, [storeRemoved])

    const goToStoreDetail = useCallback(() => {
        history.push(`${PAGE_PATHS.STORE_DETAIL}/${store.id}`)
    }, [])

    const onClickStoreRemoveButton = useCallback(() => {
        const confirmRemove = confirm("정말로 가맹점을 삭제하시겠습니까?")

        if (confirmRemove) {
            removeStore({ token, id: store.id })
        }
    }, [])

    return (
        <Container>
            <RowLayout>
                <CircleImage
                    src={`http://localhost:5000/uploads/stores${store.logoImg}`}
                />
                <Title>{store.name}</Title>
            </RowLayout>
            <div className={"text"}>
                업종: <span>{getCategoryName(store.category)}</span>
            </div>
            <div className={"text"}>
                설명: <span>{store.description}</span>
            </div>
            <div className={"text"}>
                주소: <span>{store.address}</span>
            </div>
            <div className={"button-wrap"}>
                <TextButton
                    noMargin={true}
                    color={COLORS.main}
                    onClick={goToStoreDetail}
                >
                    상세보기
                </TextButton>
            </div>
            <div className={"button-wrap"}>
                <TextButton
                    noMargin={true}
                    color={COLORS.redNormal}
                    onClick={onClickStoreRemoveButton}
                >
                    가맹점 삭제
                </TextButton>
            </div>
        </Container>
    )
}

export default MyStore

const Container = styled.div`
    width: 238px;
    height: auto;
    padding: 0.5em;
    margin: 14px;
    border: 1px solid ${COLORS.grayNormal};
    transition: all 0.2s;

    @media screen and (max-width: 768px) {
        width: 100%;
        height: auto;
    }

    .text {
        margin-top: 0.2em;
        margin-bottom: 0.2em;

        span {
            color: ${COLORS.grayBold};
            font-size: 0.9em;
        }
    }

    .button-wrap {
        display: flex;
        justify-content: flex-end;
        margin-top: 14px;
        font-weight: bold;
    }
`
