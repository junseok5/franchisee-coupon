import * as React from "react"
import { useCallback } from "react"
import AddButton from "src/components/elements/AddButton"
import { useHistory, useParams } from "react-router-dom"
import { PAGE_PATHS } from "src/constants"
import useLoadStore from "src/hooks/store/useLoadStore"

interface MyStoreAdvertisementAddButtonProps {}

const MyStoreAdvertisementAddButton: React.SFC<MyStoreAdvertisementAddButtonProps> = () => {
    const history = useHistory()
    const { id } = useParams()
    const { store } = useLoadStore()

    const goStoreEditorPage = useCallback(() => {
        if (store?.verificationStore?.status !== "ACCEPTED") {
            alert("사업자 인증을 먼저 진행해주세요.")
            return
        }
        history.push(`${PAGE_PATHS.ADVERTISEMENT_EDITOR}/stores/${id}`)
    }, [store])

    return (
        <AddButton
            title={"광고 등록하기"}
            width={320}
            height={582}
            onClick={goStoreEditorPage}
        />
    )
}

export default MyStoreAdvertisementAddButton
