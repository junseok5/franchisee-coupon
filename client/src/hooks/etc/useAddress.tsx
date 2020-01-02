import { useSelector, useDispatch } from "react-redux"
import { RootState } from "src/store/reducers"
import { useCallback } from "react"
import { CHANGE_ADDRESS } from "src/store/actions/store"

export default function useAddress() {
    const { address } = useSelector((state: RootState) => state.store)
    const dispatch = useDispatch()

    const changeAddress = useCallback(
        payload => dispatch({ type: CHANGE_ADDRESS, payload }),
        [dispatch]
    )

    return {
        address,
        changeAddress
    }
}
