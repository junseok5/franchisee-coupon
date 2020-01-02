import * as React from "react"
import styled from "styled-components"
import { COLORS, PAGE_PATHS, storageURL } from "src/constants"
import Image from "../../components/elements/Image"
import { IAdvertisement } from "src/store/reducers/store"
import RowLayout from "../../components/layout/RowLayout"
import ColumnLayout from "../../components/layout/ColumnLayout"
import SubTitle from "../../components/elements/SubTitle"
import Text from "../../components/elements/Text"
import Button from "../../components/elements/Button"
import { useHistory, useParams } from "react-router-dom"
import useUpdateAdvertisement from "src/hooks/advertisement/useUpdateAdvertisement"
import useOwnerInfo from "src/hooks/owners/useOwnerInfo"
import useLoadStoreAdvertisements from "src/hooks/advertisement/useLoadStoreAdvertisements"
import ErrorText from "src/components/elements/ErrorText"
import TextButton from "src/components/elements/TextButton"
import useRemoveAdvertisement from "src/hooks/advertisement/useRemoveAdvertisement"
import NotifyText from "src/components/elements/NotifyText"
import RowWrap from "src/components/wrap/RowWrap"

interface MyStoreAdvertisementProps {
    advertisement: IAdvertisement
}

const MyStoreAdvertisement: React.SFC<MyStoreAdvertisementProps> = ({
    advertisement
}) => {
    const { storeId } = useParams()
    const history = useHistory()
    const {
        isUpdatingAdvertisement,
        advertisementUpdated,
        updateAdvertisement
    } = useUpdateAdvertisement()
    const { token } = useOwnerInfo()
    const { loadStoreAdvertisements } = useLoadStoreAdvertisements()
    const {
        advertisementRemoved,
        removeAdvertisement
    } = useRemoveAdvertisement()

    React.useEffect(() => {
        if (advertisementUpdated) {
            if (storeId) {
                loadStoreAdvertisements({ storeId, token })
            }
        }
    }, [advertisementUpdated])

    React.useEffect(() => {
        if (advertisementRemoved) {
            if (storeId) {
                loadStoreAdvertisements({ storeId, token })
            }
        }
    }, [advertisementRemoved])

    const goToAdvertisementFormPage = React.useCallback(() => {
        history.push(
            `${PAGE_PATHS.ADVERTISEMENT_EDITOR}/${advertisement.id}/stores/${storeId}`
        )
    }, [])

    const toggleAdIsStopped = React.useCallback(() => {
        if (isUpdatingAdvertisement) {
            return
        }

        const NotisStopped = advertisement.isStopped ? "false" : "true"
        const formData = new FormData()

        formData.append("isStopped", NotisStopped)

        updateAdvertisement({ formData, token, adId: advertisement.id })
    }, [])

    const onClickRemoveAdButton = React.useCallback(() => {
        const confirmRemove = confirm("정말로 해당 광고를 삭제하시겠습니까?")

        if (confirmRemove) {
            removeAdvertisement({ id: advertisement.id, token })
        }
    }, [])

    const now = new Date()
    const startAt = new Date(`${advertisement.startAt}T00:00:00`)
    const endAt = new Date(`${advertisement.endAt}T00:00:00`)

    return (
        <Container>
            {advertisement.isStopped ? (
                <RowLayout>
                    <ErrorText>중지된 광고</ErrorText>
                </RowLayout>
            ) : endAt <= now ? (
                <RowLayout>
                    <ErrorText>마감된 광고입니다.</ErrorText>
                </RowLayout>
            ) : startAt <= now && endAt >= now ? (
                <RowLayout>
                    <NotifyText>광고 진행중..</NotifyText>
                </RowLayout>
            ) : (
                endAt > now && (
                    <RowLayout>
                        <NotifyText color={COLORS.grayBold}>
                            광고 준비중입니다.
                        </NotifyText>
                    </RowLayout>
                )
            )}
            <ColumnLayout>
                <RowLayout>
                    {advertisement.photo && (
                        <Image
                            src={`${storageURL}/ads${advertisement.photo}`}
                            width={"160px"}
                            height={"240px"}
                        />
                    )}
                    <ColumnLayout>
                        <RowWrap>
                            <SubTitle>제목</SubTitle>
                        </RowWrap>
                        <RowWrap>
                            <Text size={12}>{advertisement.title}</Text>
                        </RowWrap>
                        {advertisement.description && (
                            <>
                                <RowWrap>
                                    <SubTitle>설명</SubTitle>
                                </RowWrap>
                                <RowWrap>
                                    <Text size={12}>
                                        {advertisement.description}
                                    </Text>
                                </RowWrap>
                            </>
                        )}
                        <RowWrap>
                            <SubTitle>광고 시작일</SubTitle>
                        </RowWrap>
                        <RowWrap>
                            <Text size={12}>{advertisement.startAt}</Text>
                        </RowWrap>
                        <RowWrap>
                            <SubTitle>광고 마감일</SubTitle>
                        </RowWrap>
                        <RowWrap>
                            <Text size={12}>{advertisement.endAt}</Text>
                        </RowWrap>
                    </ColumnLayout>
                </RowLayout>
            </ColumnLayout>
            <ColumnLayout>
                <RowLayout>
                    <RowWrap>
                        <SubTitle>광고 유형</SubTitle>
                    </RowWrap>
                    <Text>
                        {advertisement.adType === "COUPON" ? "쿠폰" : "특가"}
                    </Text>
                </RowLayout>
                {advertisement.adType === "COUPON" && (
                    <RowLayout>
                        <RowWrap>
                            <SubTitle>쿠폰 번호</SubTitle>
                        </RowWrap>
                        <Text>{advertisement.couponNum}</Text>
                    </RowLayout>
                )}
                <RowLayout>
                    <RowWrap>
                        <SubTitle>조회수</SubTitle>
                    </RowWrap>
                    <Text>{advertisement.views}회</Text>
                </RowLayout>
                <RowLayout>
                    <RowWrap>
                        <SubTitle>클릭수</SubTitle>
                    </RowWrap>
                    <Text>{advertisement.clickNum}회</Text>
                </RowLayout>
                <RowLayout>
                    <RowWrap>
                        <SubTitle>다운로드수</SubTitle>
                    </RowWrap>
                    <Text>{advertisement.downloadNum}회</Text>
                </RowLayout>
            </ColumnLayout>
            <div className={"bottom"}>
                <div className={"remove-ad"}>
                    <TextButton
                        color={COLORS.redNormal}
                        onClick={onClickRemoveAdButton}
                    >
                        광고 삭제하기
                    </TextButton>
                </div>
                <ColumnLayout>
                    <Button
                        title={"수정하기"}
                        onClick={goToAdvertisementFormPage}
                    />
                    {advertisement.isStopped ? (
                        <Button
                            title={"광고 시작"}
                            bgColor={COLORS.greenNormal}
                            onClick={toggleAdIsStopped}
                        />
                    ) : (
                        <Button
                            title={"광고 중지"}
                            bgColor={COLORS.redNormal}
                            onClick={toggleAdIsStopped}
                        />
                    )}
                </ColumnLayout>
            </div>
        </Container>
    )
}

export default MyStoreAdvertisement

const Container = styled.div`
    position: relative;
    width: 320px;
    height: auto;
    padding: 0.5em 0.5em 8em 0.5em;
    margin: 14px 14px 14px 0;
    border: 1px solid ${COLORS.grayNormal};
    border-bottom-width: 2px;
    border-radius: 4px;

    @media screen and (max-width: 768px) {
        width: 100%;
        height: auto;
        margin-left: 14px;
    }

    .remove-ad {
        display: flex;
        justify-content: flex-end;
    }

    .bottom {
        position: absolute;
        width: calc(100% - 1em);
        bottom: 0.5em;
    }
`
