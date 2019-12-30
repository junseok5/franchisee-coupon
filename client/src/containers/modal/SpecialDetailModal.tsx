import * as React from "react"
import useSpecialDetailModal from "src/hooks/modal/useSpecialDetailModal"
import Modal from "src/components/boxes/Modal"
import Image from "src/components/elements/Image"
import useAdvertisementInModal from "src/hooks/modal/useAdvertisementInModal"
import Text from "src/components/elements/Text"
import SubTitle from "src/components/elements/SubTitle"
import Button from "src/components/elements/Button"
// @ts-ignore
import domtoimage from "dom-to-image"

const SpecialDetailModal: React.SFC = () => {
    const {
        specialDetailModalVisible,
        onHideSpecialDetailModal
    } = useSpecialDetailModal()
    const { advertisementInModal: ad } = useAdvertisementInModal()
    const modalDom = document.getElementById("modal")

    const onClickDownloadButton = React.useCallback(() => {
        domtoimage
            .toPng(modalDom, { width: 640, height: 960 })
            .then((dataUrl: any) => {
                const link = document.createElement("a")
                link.download = "my-image-name.jpeg"
                link.href = dataUrl
                link.click()
            })
    }, [modalDom])

    return (
        <Modal
            title={ad.title}
            show={specialDetailModalVisible}
            onHideModal={onHideSpecialDetailModal}
        >
            <Image
                src={`http://localhost:5000/uploads/ads${ad.photo}`}
                width={"292px"}
                height={"auto"}
            />

            <Text>{ad.description}</Text>
            <SubTitle noHorizontalMargin={true}>
                {ad.startAt} ~ {ad.endAt}
            </SubTitle>
            <Button title={"다운받기"} onClick={onClickDownloadButton} />
        </Modal>
    )
}

export default SpecialDetailModal
