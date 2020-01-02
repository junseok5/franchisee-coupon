import { useSelector, useDispatch } from "react-redux"
import { RootState } from "src/store/reducers"
import { useCallback } from "react"
import {
    SHOW_SPECIAL_DETAIL_MODAL,
    HIDE_SPECIAL_DETAIL_MODAL
} from "src/store/actions/modal"

export default function useSpecialDetailModal() {
    const { specialDetailModalVisible } = useSelector(
        (state: RootState) => state.modal
    )
    const dispatch = useDispatch()

    const onShowSpecialDetailModal = useCallback(
        () => dispatch({ type: SHOW_SPECIAL_DETAIL_MODAL }),
        [dispatch]
    )
    const onHideSpecialDetailModal = useCallback(
        () => dispatch({ type: HIDE_SPECIAL_DETAIL_MODAL }),
        [dispatch]
    )

    return {
        specialDetailModalVisible,
        onShowSpecialDetailModal,
        onHideSpecialDetailModal
    }
}
