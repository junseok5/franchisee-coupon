import { useSelector, useDispatch } from "react-redux"
import { RootState } from "src/store/reducers"
import { useCallback } from "react"
import { StoreInfo } from "src/store/reducers/owner"
import { LOAD_MY_STORES_REQUEST } from "src/store/actions/owner"

interface GetMyStoresPayload {
    id: number
    token: string
}

export default function useMyStores() {
    const {
        myStores,
        isLoadingMyStores,
        loadMystoresErrorMessage
    } = useSelector((state: RootState) => state.owner)
    const dispatch = useDispatch()

    const loadMyStores = useCallback(
        (payload: GetMyStoresPayload) =>
            dispatch({ type: LOAD_MY_STORES_REQUEST, payload }),
        [dispatch]
    )

    return {
        isLoadingMyStores,
        myStores,
        loadMystoresErrorMessage,
        loadMyStores
    } as {
        isLoadingMyStores: boolean
        myStores: StoreInfo[]
        loadMystoresErrorMessage: string
        loadMyStores: typeof loadMyStores
    }
}
