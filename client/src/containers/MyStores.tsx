import * as React from "react"
import { useEffect } from "react"
import useMyStores from "src/hooks/useMyStores"
import useOwnerInfo from "src/hooks/useOwnerInfo"
import MyStoreAddButton from "src/containers/MyStoreAddButton"
import MyStore from "../components/MyStore"

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

    console.log(isLoadingMyStores)
    console.log(myStores)

    return (
        <>
            <MyStoreAddButton />
            {myStores.map(myStore => (
                <MyStore
                    logoImg={myStore.logoImg}
                    name={myStore.name}
                    category={myStore.category}
                    description={myStore.description}
                />
            ))}
        </>
    )
}

export default MyStores
