import { useSelector, useDispatch } from "react-redux"
import { RootState } from "src/store/reducers"
import { useCallback } from "react"
import {
    SHOW_REGISTER_MODAL,
    HIDE_REGISTER_MODAL
} from "src/store/actions/modal"

export default function useRegisterModal() {
    const { registerModalVisible } = useSelector(
        (state: RootState) => state.modal
    )
    const dispatch = useDispatch()

    const onShowRegisterModal = useCallback(
        () => dispatch({ type: SHOW_REGISTER_MODAL }),
        [dispatch]
    )
    const onHideRegisterModal = useCallback(
        () => dispatch({ type: HIDE_REGISTER_MODAL }),
        [dispatch]
    )

    return {
        registerModalVisible,
        onHideRegisterModal,
        onShowRegisterModal
    }
}
