import { useSelector, useDispatch } from "react-redux"
import { RootState } from "src/store/reducers"
import { useCallback } from "react"
import { GET_MY_STORE_LIST_REQUEST } from "src/store/actions/owner"
import { StoreInfo } from "src/store/reducers/owner"

interface GetMyStoresPayload {
    id: number
    token: string
}

export default function useMyStores() {
    const {
        myStores,
        isGettingMyStores,
        getMystoresErrorMessage
    } = useSelector((state: RootState) => state.owner)
    const dispatch = useDispatch()

    const getMyStores = useCallback(
        (payload: GetMyStoresPayload) =>
            dispatch({ type: GET_MY_STORE_LIST_REQUEST, payload }),
        [dispatch]
    )

    return {
        isGettingMyStores,
        myStores,
        getMystoresErrorMessage,
        getMyStores
    } as {
        isGettingMyStores: boolean
        myStores: StoreInfo[]
        getMystoresErrorMessage: string
        getMyStores: typeof getMyStores
    }
}
