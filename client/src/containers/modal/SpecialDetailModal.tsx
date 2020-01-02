import * as React from "react"
import useSpecialDetailModal from "src/hooks/modal/useSpecialDetailModal"
import Modal from "src/components/boxes/Modal"
import Image from "src/components/elements/Image"
import useAdvertisementInModal from "src/hooks/modal/useAdvertisementInModal"
import Text from "src/components/elements/Text"
import SubTitle from "src/components/elements/SubTitle"

const SpecialDetailModal: React.SFC = () => {
    const {
        specialDetailModalVisible,
        onHideSpecialDetailModal
    } = useSpecialDetailModal()
    const { advertisementInModal: ad } = useAdvertisementInModal()

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
        </Modal>
    )
}

export default SpecialDetailModal
