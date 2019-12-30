import * as React from "react"
import styled from "styled-components"
import Image from "src/components/elements/Image"
import useAdvertisementInModal from "src/hooks/modal/useAdvertisementInModal"
import { IAdvertisement } from "src/store/reducers/store"
import useCouponDetailModal from "src/hooks/modal/useCouponDetailModal"
import useSpecialDetailModal from "src/hooks/modal/useSpecialDetailModal"

interface AdvertisementProps {
    ad: IAdvertisement
}

const Advertisement: React.SFC<AdvertisementProps> = ({ ad }) => {
    const { changeAdvertisementInModal } = useAdvertisementInModal()
    const { onShowCouponDetailModal } = useCouponDetailModal()
    const { onShowSpecialDetailModal } = useSpecialDetailModal()

    const onClickAdvertisement = React.useCallback(() => {
        changeAdvertisementInModal(ad)

        if (ad.adType === "COUPON") {
            onShowCouponDetailModal()
        } else {
            onShowSpecialDetailModal()
        }
    }, [])

    return (
        <Container onClick={onClickAdvertisement}>
            <Image
                src={`http://localhost:5000/uploads/ads${ad.photo}`}
                width={"320px"}
                height={"480px"}
            />
        </Container>
    )
}

export default Advertisement

const Container = styled.div`
    margin-left: 0.5em;
    margin-right: 0.5em;
    margin-bottom: 1em;
    user-select: none;
    cursor: pointer;
`
