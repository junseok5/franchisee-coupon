import * as React from "react"
import styled from "styled-components"
import { COLORS, storageURL } from "src/constants"
import RowLayout from "src/components/layout/RowLayout"
import ErrorText from "src/components/elements/ErrorText"
import { IAdvertisement } from "src/store/reducers/store"
import NotifyText from "src/components/elements/NotifyText"
import ColumnLayout from "src/components/layout/ColumnLayout"
import Image from "src/components/elements/Image"
import RowWrap from "src/components/wrap/RowWrap"
import SubTitle from "src/components/elements/SubTitle"
import Text from "src/components/elements/Text"
import Button from "src/components/elements/Button"
import useRemoveAdminAdvertisement from "src/hooks/admin/useRemoveAdminAdvertisement"
import useAdminLogin from "src/hooks/admin/useAdminLogin"
import useLoadAdminAdvertisements from 'src/hooks/admin/useLoadAdminAdvertisements'

interface AdminAdvertisementProps {
    advertisement: IAdvertisement
}

const AdminAdvertisement: React.SFC<AdminAdvertisementProps> = ({
    advertisement
}) => {
    const {
        isRemovedAdvertisement,
        removeAdvertisementErrorMessage,
        removeAdvertisement
    } = useRemoveAdminAdvertisement()
    const { adminToken } = useAdminLogin()
    const { loadAdvertisements } = useLoadAdminAdvertisements()

    React.useEffect(() => {
        if (removeAdvertisementErrorMessage) {
            alert(removeAdvertisementErrorMessage)
        }
    }, [removeAdvertisementErrorMessage])

    React.useEffect(() => {
        if (isRemovedAdvertisement && adminToken) {
            loadAdvertisements(adminToken)
        }
    }, [isRemovedAdvertisement])

    const onClickRemoveButton = React.useCallback(
        (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
            event.preventDefault()

            if (adminToken) {
                removeAdvertisement({ id: advertisement.id, token: adminToken })
            }
        },
        [advertisement]
    )

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
            <div className={"remove-ad"}>
                <div className={"bottom"}>
                    <Button
                        title={"삭제하기"}
                        bgColor={COLORS.redNormal}
                        onClick={onClickRemoveButton}
                    />
                </div>
            </div>
        </Container>
    )
}

export default AdminAdvertisement

const Container = styled.div`
    position: relative;
    width: 320px;
    height: auto;
    padding: 0.5em 0.5em 4em 0.5em;
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
