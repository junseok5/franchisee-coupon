import { useSelector, useDispatch } from "react-redux"
import { RootState } from "src/store/reducers"
import { useCallback } from "react"
import {
    SHOW_PASSWORD_CHANGE_MODAL,
    HIDE_PASSWORD_CHANGE_MODAL
} from "src/store/actions/modal"

export default function usePasswordChangeModal() {
    const { passwordChangeModalVisible } = useSelector(
        (state: RootState) => state.modal
    )
    const dispatch = useDispatch()

    const onShowPasswordChangeModal = useCallback(
        () => dispatch({ type: SHOW_PASSWORD_CHANGE_MODAL }),
        [dispatch]
    )
    const onHidePasswordChangeModal = useCallback(
        () => dispatch({ type: HIDE_PASSWORD_CHANGE_MODAL }),
        [dispatch]
    )

    return {
        passwordChangeModalVisible,
        onShowPasswordChangeModal,
        onHidePasswordChangeModal
    }
}
