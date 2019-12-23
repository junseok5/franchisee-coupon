import * as React from "react"
import { useEffect } from "react"
import useMyStores from "src/hooks/useMyStores"
import useOwnerInfo from "src/hooks/useOwnerInfo"
import MyStoreAddButton from "src/components/MyStoreAddButton"
import MyStore from "../components/MyStore"

interface MyStoresProps {}

const MyStores: React.SFC<MyStoresProps> = () => {
    const {
        me: { num },
        token
    } = useOwnerInfo()
    const { isGettingMyStores, myStores, getMyStores } = useMyStores()

    useEffect(() => {
        getMyStores({ id: num, token })
    }, [])

    console.log(isGettingMyStores)
    console.log(myStores)

    return (
        <>
            <MyStoreAddButton />
            <MyStore />
        </>
    )
}

export default MyStores
