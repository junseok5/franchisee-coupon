import * as React from "react"
import Header from "src/containers/boxes/Header"
import CheckLogged from "src/containers/etc/CheckLogged"
import EditorLayout from "src/components/layout/EditorLayout"
import Title from "src/components/elements/Title"
import AdvertisementForm from "src/containers/advertisement/AdvertisementForm"

const AdvertisementEditorPage: React.SFC = () => {
    return (
        <>
            <Header />
            <CheckLogged>
                <EditorLayout>
                    <Title noHorizontalMargin={true}>광고 등록하기</Title>
                    <AdvertisementForm />
                </EditorLayout>
            </CheckLogged>
        </>
    )
}

export default AdvertisementEditorPage
