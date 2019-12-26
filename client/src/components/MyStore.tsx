import * as React from "react"
import { useCallback } from "react"
import styled from "styled-components"
import Title from "./Title"
import { COLORS, PAGE_PATHS } from "src/constants"
import CircleImage from "./CircleImage"
import RowLayout from "./RowLayout"
import Text from "./Text"
import { IStore } from "src/store/reducers/store"
import { useHistory } from "react-router-dom"
import getCategoryName from "src/utils/getCategoryName"

interface MyStoreProps {
    store: IStore
}

const MyStore: React.SFC<MyStoreProps> = ({ store }) => {
    const history = useHistory()

    const goToStoreDetail = useCallback(() => {
        history.push(`${PAGE_PATHS.STORE_DETAIL}/${store.id}`)
    }, [])

    return (
        <Container onClick={goToStoreDetail}>
            <RowLayout>
                <CircleImage
                    src={`http://localhost:5000/uploads/stores${store.logoImg}`}
                />
                <Title>{store.name}</Title>
            </RowLayout>
            <Text>업종: {getCategoryName(store.category)}</Text>
            <Text>{store.description}</Text>
        </Container>
    )
}

export default MyStore

const Container = styled.div`
    width: 238px;
    height: 238px;
    padding: 0.5em;
    margin: 14px;
    border: 1px solid ${COLORS.grayNormal};
    user-select: none;
    cursor: pointer;
    transition: all 0.2s;

    @media screen and (max-width: 768px) {
        width: 100%;
        height: auto;
    }
`
