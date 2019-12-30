import { useSelector, useDispatch } from "react-redux"
import { RootState } from "src/store/reducers"
import { useCallback } from "react"
import {
    SHOW_COUPON_DETAIL_MODAL,
    HIDE_COUPON_DETAIL_MODAL
} from "src/store/actions/modal"

export default function useCouponDetailModal() {
    const { couponDetailModalVisible } = useSelector(
        (state: RootState) => state.modal
    )
    const dispatch = useDispatch()

    const onShowCouponDetailModal = useCallback(
        () => dispatch({ type: SHOW_COUPON_DETAIL_MODAL }),
        [dispatch]
    )
    const onHideCouponDetailModal = useCallback(
        () => dispatch({ type: HIDE_COUPON_DETAIL_MODAL }),
        [dispatch]
    )

    return {
        couponDetailModalVisible,
        onShowCouponDetailModal,
        onHideCouponDetailModal
    } as {
        couponDetailModalVisible: boolean
        onShowCouponDetailModal: typeof onShowCouponDetailModal
        onHideCouponDetailModal: typeof onHideCouponDetailModal
    }
}
