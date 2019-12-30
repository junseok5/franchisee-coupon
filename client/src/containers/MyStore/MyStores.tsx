import * as React from "react"
import { useEffect } from "react"
import useMyStores from "src/hooks/owners/useMyStores"
import useOwnerInfo from "src/hooks/owners/useOwnerInfo"
import Loading from "src/components/etc/Loading"
import BoxContainer from "src/components/boxes/BoxContainer"
import Title from "src/components/elements/Title"
import MyStore from "./MyStore"
import TextButton from "src/components/elements/TextButton"
import RowBetweenLayout from "src/components/layout/RowBetweenLayout"
import { useHistory } from "react-router-dom"
import { PAGE_PATHS } from "src/constants"

interface MyStoresProps {}

const MyStores: React.SFC<MyStoresProps> = () => {
    const {
        me: { num },
        token
    } = useOwnerInfo()
    const { isLoadingMyStores, myStores, loadMyStores } = useMyStores()
    const history = useHistory()

    useEffect(() => {
        loadMyStores({ id: num, token })
    }, [])

    const onClickStoreAddButton = React.useCallback(() => {
        history.push(`${PAGE_PATHS.STORE_EDITOR}`)
    }, [])

    return (
        <BoxContainer>
            <RowBetweenLayout>
                <Title>내 가맹점</Title>
                <TextButton onClick={onClickStoreAddButton}>
                    + 가맹점 추가
                </TextButton>
            </RowBetweenLayout>

            {isLoadingMyStores ? (
                <Loading />
            ) : (
                <>
                    {myStores.map(myStore => (
                        <MyStore key={myStore.id} store={myStore} />
                    ))}
                </>
            )}
        </BoxContainer>
    )
}

export default MyStores
