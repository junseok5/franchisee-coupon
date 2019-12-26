import { useSelector, useDispatch } from "react-redux"
import { RootState } from "src/store/reducers"
import { useCallback } from "react"
import { ADD_BIZ_REG_IMG_REQUEST } from "src/store/actions/store"

export default function useAddBizRegImg() {
    const {
        isAddingBizRegImg,
        addedBizRegImg,
        addBizRegImgErrorMessage
    } = useSelector((state: RootState) => state.store)
    const dispatch = useDispatch()

    const addBizRegImg = useCallback(
        payload => dispatch({ type: ADD_BIZ_REG_IMG_REQUEST, payload }),
        [dispatch]
    )

    return {
        isAddingBizRegImg,
        addedBizRegImg,
        addBizRegImgErrorMessage,
        addBizRegImg
    } as {
        isAddingBizRegImg: boolean
        addedBizRegImg: boolean
        addBizRegImgErrorMessage: string
        addBizRegImg: typeof addBizRegImg
    }
}
