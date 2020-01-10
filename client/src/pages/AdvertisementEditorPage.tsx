import * as React from "react"
import Header from "src/containers/boxes/Header"
import CheckLogged from "src/containers/etc/CheckLogged"
import EditorLayout from "src/components/layout/EditorLayout"
import Title from "src/components/elements/Title"
import AdvertisementForm from "src/containers/advertisement/AdvertisementForm"
import { useParams } from 'react-router-dom'

const AdvertisementEditorPage: React.SFC = () => {
    const { adId } = useParams()

    return (
        <>
            <Header />
            <CheckLogged>
                <EditorLayout>
                    <Title>광고 {adId ? "수정하기" : "등록하기"}</Title>
                    <AdvertisementForm />
                </EditorLayout>
            </CheckLogged>
        </>
    )
}

export default AdvertisementEditorPage
