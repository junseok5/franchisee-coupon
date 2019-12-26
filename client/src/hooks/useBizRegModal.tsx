import { useSelector, useDispatch } from "react-redux"
import { RootState } from "src/store/reducers"
import { useCallback } from "react"
import { SHOW_BIZ_REG_MODAL, HIDE_BIZ_REG_MODAL } from "src/store/actions/modal"

export default function useBizRegModal() {
    const { bizRegModalVisible } = useSelector(
        (state: RootState) => state.modal
    )
    const dispatch = useDispatch()

    const onShowBizRegModal = useCallback(
        () => dispatch({ type: SHOW_BIZ_REG_MODAL }),
        [dispatch]
    )
    const onHideBizRegModal = useCallback(
        () => dispatch({ type: HIDE_BIZ_REG_MODAL }),
        [dispatch]
    )

    return {
        bizRegModalVisible,
        onShowBizRegModal,
        onHideBizRegModal
    } as {
        bizRegModalVisible: boolean
        onShowBizRegModal: typeof onShowBizRegModal
        onHideBizRegModal: typeof onHideBizRegModal
    }
}
