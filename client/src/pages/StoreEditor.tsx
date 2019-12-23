import * as React from "react"
import Header from "src/containers/Header"
import CheckLogged from "src/containers/CheckLogged"
import Title from "src/components/Title"
import StoreForm from "src/containers/StoreForm"
import EditorLayout from "src/components/EditorLayout"

interface StoreEditorProps {}

const StoreEditor: React.SFC<StoreEditorProps> = () => {
    return (
        <>
            <Header />
            <CheckLogged>
                <EditorLayout>
                    <Title noHorizontalMargin={true}>가맹점 등록하기</Title>
                    <StoreForm />
                </EditorLayout>
            </CheckLogged>
        </>
    )
}

export default StoreEditor
