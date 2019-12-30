import * as React from "react"
import Header from "src/containers/boxes/Header"
import CheckLogged from "src/containers/etc/CheckLogged"
import Title from "src/components/elements/Title"
import StoreForm from "src/containers/store/StoreForm"
import EditorLayout from "src/components/layout/EditorLayout"
import { useParams } from "react-router-dom"
import MapsGeocodingModal from "src/containers/modal/MapsGeocodingModal"

const StoreEditorPage: React.SFC = () => {
    const { id } = useParams()
    return (
        <>
            <Header />
            <CheckLogged>
                <EditorLayout>
                    <Title noHorizontalMargin={true}>
                        가맹점 {id ? "수정하기" : "등록하기"}
                    </Title>
                    <StoreForm />
                </EditorLayout>
                <MapsGeocodingModal />
            </CheckLogged>
        </>
    )
}

export default StoreEditorPage
