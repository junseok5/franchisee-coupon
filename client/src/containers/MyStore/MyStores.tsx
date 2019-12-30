import * as React from "react"
import { useEffect } from "react"
import useMyStores from "src/hooks/owners/useMyStores"
import useOwnerInfo from "src/hooks/owners/useOwnerInfo"
import MyStoreAddButton from "src/containers/elements/MyStoreAddButton"
import MyStore from "./MyStore"
import Loading from "src/components/etc/Loading"

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
