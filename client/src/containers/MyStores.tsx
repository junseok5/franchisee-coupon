import * as React from "react"
import { useEffect } from "react"
import useMyStores from "src/hooks/useMyStores"
import useOwnerInfo from "src/hooks/useOwnerInfo"
import MyStoreAddButton from "src/containers/MyStoreAddButton"
import MyStore from "../components/MyStore"
import Loading from "src/components/Loading"

interface MyStoresProps {}

const MyStores: React.SFC<MyStoresProps> = () => {
    const {
        me: { num },
        token
    } = useOwnerInfo()
    const { isLoadingMyStores, myStores, loadMyStores } = useMyStores()

    useEffect(() => {
        loadMyStores({ id: num, token })
    }, [])

    return (
        <>
            {isLoadingMyStores ? (
                <Loading />
            ) : (
                <>
                    <MyStoreAddButton />
                    {myStores.map(myStore => (
                        <MyStore key={myStore.id} store={myStore} />
                    ))}
                </>
            )}
        </>
    )
}

export default MyStores
