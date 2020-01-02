import { useSelector, useDispatch } from "react-redux"
import { RootState } from "src/store/reducers"
import { useCallback } from "react"
import { LOAD_MY_STORES_REQUEST } from "src/store/actions/owner"
import { LoadMyStoresParams } from 'src/api/owner'

export default function useMyStores() {
    const {
        myStores,
        isLoadingMyStores,
        loadMystoresErrorMessage
    } = useSelector((state: RootState) => state.owner)
    const dispatch = useDispatch()

    const loadMyStores = useCallback(
        (payload: LoadMyStoresParams) =>
            dispatch({ type: LOAD_MY_STORES_REQUEST, payload }),
        [dispatch]
    )

    return {
        isLoadingMyStores,
        myStores,
        loadMystoresErrorMessage,
        loadMyStores
    }
}
