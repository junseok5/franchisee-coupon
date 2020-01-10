import * as React from "react"
import styled from "styled-components"
import useCouponDetailModal from "src/hooks/modal/useCouponDetailModal"
import useAdvertisementInModal from "src/hooks/modal/useAdvertisementInModal"
import Modal from "src/components/boxes/Modal"
import SubTitle from "src/components/elements/SubTitle"
import Text from "src/components/elements/Text"
import Button from "src/components/elements/Button"
// @ts-ignore
import Barcode from "react-barcode"
// @ts-ignore
import domtoimage from "dom-to-image"
import { storageURL } from "src/constants"

interface CouponDetailModalProps {}

const CouponDetailModal: React.SFC<CouponDetailModalProps> = () => {
    const {
        couponDetailModalVisible,
        onHideCouponDetailModal
    } = useCouponDetailModal()
    const { advertisementInModal: ad } = useAdvertisementInModal()

    const onClickDownloadButton = React.useCallback(() => {
        const modalDom = document.getElementById(`coupon-wrap ${ad.id}`)
        domtoimage
            .toJpeg(modalDom, { quality: 0.95 })
            .then((dataUrl: string) => {
                const link = document.createElement("a")
                link.download = `${ad.title}.jpeg`
                link.href = dataUrl
                link.click()
            })
            .catch((e: Error) => {
                console.error(e)
            })
    }, [ad])

    return (
        <Modal
            title={ad.title}
            show={couponDetailModalVisible}
            onHideModal={onHideCouponDetailModal}
        >
            <div id={`coupon-wrap ${ad.id}`}>
                <Container>
                    <CouponImage src={`${storageURL}/ads${ad.photo}`} />
                    <BarcodeWrap>
                        <Barcode value={ad.couponNum} width={2.4} height={80} />
                    </BarcodeWrap>
                    <BottomWrap>
                        <Text>{ad.description}</Text>
                        <SubTitle noHorizontalMargin={true}>
                            {ad.startAt} ~ {ad.endAt}
                        </SubTitle>
                    </BottomWrap>
                </Container>
            </div>
            <Button title={"다운받기"} onClick={onClickDownloadButton} />
        </Modal>
    )
}

export default CouponDetailModal

const Container = styled.div`
    background-color: #fff;
    width: 100%;
    padding-bottom: 1em;
`

const BarcodeWrap = styled.div`
    display: flex;
    justify-content: center;
`

const CouponImage = styled.img`
    width: 100%;
    height: auto;
    margin-top: 1em;
    margin-bottom: 1em;
    border-radius: 4px;
    overflow: hidden;

    img {
        width: 100%;
        height: 100%;
    }
`
const BottomWrap = styled.div`
    padding-left: 0.5em;
    padding-right: 0.5em;
`
