import * as React from "react"
import Header from "src/containers/boxes/Header"
import CheckLogged from "src/containers/etc/CheckLogged"
import StoreForm from "src/containers/store/StoreForm"
import EditorLayout from "src/components/layout/EditorLayout"
import MapsGeocodingModal from "src/containers/modal/MapsGeocodingModal"

const StoreEditorPage: React.SFC = () => {
    return (
        <>
            <Header />
            <CheckLogged>
                <EditorLayout>
                    <StoreForm />
                </EditorLayout>
                <MapsGeocodingModal />
            </CheckLogged>
        </>
    )
}

export default StoreEditorPage
