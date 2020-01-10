import * as React from "react"
import styled from "styled-components"
import useAdvertisementInModal from "src/hooks/modal/useAdvertisementInModal"
import { IAdvertisement } from "src/store/reducers/store"
import useCouponDetailModal from "src/hooks/modal/useCouponDetailModal"
import useSpecialDetailModal from "src/hooks/modal/useSpecialDetailModal"
import { storageURL, COLORS } from "src/constants"

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
        <div className={"advertisement animated fade-in"}>
            <Container onClick={onClickAdvertisement}>
                <div className={"header"}>
                    <div className={"logo"}>
                        <img
                            src={require("src/static/images/in500m_logo_2.png")}
                        />
                    </div>
                </div>
                <div className={"image"}>
                    <img src={`${storageURL}/ads${ad.photo}`} />
                </div>
                <div className={"bottom"}>
                    <div className={"bottom-content"}>
                        <div className={"title"}>{ad.title}</div>
                        <div
                            className={"date"}
                        >{`${ad.startAt} ~ ${ad.endAt}`}</div>
                        <div className={"coupon-download-button"}>
                            {ad.adType === "COUPON" ? "쿠폰받기" : "상세보기"}
                        </div>
                    </div>
                    <div className={"bottom-outset"} />
                </div>
            </Container>
        </div>
    )
}

export default Advertisement

const Container = styled.div`
    width: 280px;
    margin-bottom: 1em;
    user-select: none;
    cursor: pointer;
    overflow: hidden;

    @media screen and (max-width: 768px) {
        width: 100%;
    }

    .header {
        position: relative;
        height: 2em;
        background-color: #fff;
        border-top-left-radius: 20px;
        border-top-right-radius: 20px;
        border-left: 1px solid ${COLORS.border};
        border-right: 1px solid ${COLORS.border};
        font-size: 0.9em;
        font-weight: bold;
        overflow: hidden;
        box-shadow: 1px 0 1px 0px ${COLORS.border};

        .logo {
            overflow: hidden;
            position: absolute;
            top: -20px;
            left: 4px;
            width: 70px;

            img {
                width: 100%;
            }
        }
    }

    .image {
        position: relative;
        width: 100%;
        height: 420px;
        overflow: hidden;

        &:before {
            content: "";
            position: absolute;
            bottom: 0;
            right: 0;
            border-top: 1px solid ${COLORS.border};
            border-left: 1px solid ${COLORS.border};
            /* border-left: 1px solid ${COLORS.border}; */
            border-top-left-radius: 100%;
            width: 12px;
            height: 12px;
            background-color: ${COLORS.background};
            z-index: 10;
        }

        &:after {
            content: "";
            position: absolute;
            bottom: 0;
            left: 0;
            border-top: 1px solid ${COLORS.border};
            border-right: 1px solid ${COLORS.border};
            /* border-right: 1px solid ${COLORS.background}; */
            border-top-right-radius: 100%;
            width: 12px;
            height: 12px;
            background-color: ${COLORS.background};
        }

        img {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    }

    .bottom {
        position: relative;
        background-color: #fff;
        display: flex;
        justify-content: center;
        width: 100%;
        padding-top: 1.5em;
        padding-bottom: 1.5em;

        &:before {
            content: "";
            position: absolute;
            top: 0;
            right: 0;
            border-bottom: 1px solid ${COLORS.border};
            border-left: 1px solid ${COLORS.border};
            /* border-left: 1px solid ${COLORS.background}; */
            border-bottom-left-radius: 100%;
            width: 12px;
            height: 12px;
            background-color: ${COLORS.background};
        }

        &:after {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            border-bottom: 1px solid ${COLORS.border};
            border-right: 1px solid ${COLORS.border};
            border-bottom-right-radius: 100%;
            width: 12px;
            height: 12px;
            background-color: ${COLORS.background};
        }

        .bottom-content {
            width: 100%;
            padding-left: 1em;
            padding-right: 1em;

            .title {
                width: 100%;
                margin-bottom: 0.2em;
                font-size: 1.3em;
                font-weight: bold;
                text-align: center;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }

            .date {
                margin-bottom: 1em;
                color: #ff5c8a;
                font-weight: bold;
                text-align: center;
            }

            .coupon-download-button {
                width: 100%;
                padding: 0.7em;
                background-color: #ff5c8a;
                display: flex;
                justify-content: center;
                align-items: center;
                color: white;
                font-size: 1.4em;
                font-weight: bold;
                border-radius: 4px;
            }
        }
    
        .bottom-outset {
            position: absolute;
            bottom: -5px;
            top:0;
            width: 100%;
            border-bottom: 10px dotted ${COLORS.background};
        }
    }
`
