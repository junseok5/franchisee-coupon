import * as React from "react"
import { useCallback } from "react"
import { PAGE_PATHS } from "src/constants"
import { useHistory } from "react-router-dom"
import AddButton from "src/components/elements/AddButton"

const MyStoreAddButton: React.SFC = () => {
    const history = useHistory()

    const goStoreEditorPage = useCallback(() => {
        history.push(`${PAGE_PATHS.STORE_EDITOR}`)
    }, [])

    return <AddButton title={"가맹점 등록하기"} onClick={goStoreEditorPage} />
}

export default MyStoreAddButton
