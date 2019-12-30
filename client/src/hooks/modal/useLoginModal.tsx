import { useSelector, useDispatch } from "react-redux"
import { RootState } from "src/store/reducers"
import { useCallback } from "react"
import { SHOW_LOGIN_MODAL, HIDE_LOGIN_MODAL } from "src/store/actions/modal"

export default function useLoginModal() {
    const { loginModalVisible } = useSelector((state: RootState) => state.modal)
    const dispatch = useDispatch()

    const onShowLoginModal = useCallback(
        () => dispatch({ type: SHOW_LOGIN_MODAL }),
        [dispatch]
    )
    const onHideLoginModal = useCallback(
        () => dispatch({ type: HIDE_LOGIN_MODAL }),
        [dispatch]
    )

    return {
        loginModalVisible,
        onShowLoginModal,
        onHideLoginModal
    } as {
        loginModalVisible: boolean
        onShowLoginModal: typeof onShowLoginModal
        onHideLoginModal: typeof onHideLoginModal
    }
}
