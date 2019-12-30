import * as React from "react"
import { useEffect } from "react"
import BoxContainer from "src/components/boxes/BoxContainer"
import ColumnLayout from "src/components/layout/ColumnLayout"
import Title from "src/components/elements/Title"
import RowLayout from "src/components/layout/RowLayout"
import SubTitle from "src/components/elements/SubTitle"
import { COLORS, PAGE_PATHS } from "src/constants"
import Text from "src/components/elements/Text"
import useLoadStore from "src/hooks/store/useLoadStore"
import Loading from "src/components/etc/Loading"
import { useParams, useHistory } from "react-router-dom"
import useOwnerInfo from "src/hooks/owners/useOwnerInfo"
import getCategoryName from "src/utils/getCategoryName"
import TextButton from "src/components/elements/TextButton"
import useBizRegModal from "src/hooks/modal/useBizRegModal"
import Button from "src/components/elements/Button"
import CircleImage from "src/components/elements/CircleImage"

interface StoreDetailProps {}

const StoreDetail: React.SFC<StoreDetailProps> = () => {
    const { isLoadingStore, store, loadStore } = useLoadStore()
    const { id } = useParams()
    const { token } = useOwnerInfo()
    const { onShowBizRegModal } = useBizRegModal()
    const history = useHistory()

    let verificationStatus

    if (store && store.verificationStore) {
        verificationStatus = store.verificationStore.status
    }

    useEffect(() => {
        loadStore({ id, token })
    }, [])

    const goToStoreEditor = React.useCallback(() => {
        history.push(`${PAGE_PATHS.STORE_EDITOR}/${id}`)
    }, [])

    return (
        <BoxContainer height={422}>
            {isLoadingStore ? (
                <Loading />
            ) : (
                <ColumnLayout>
                    <Title>가맹점 정보</Title>
                    <RowLayout>
                        <div style={{ marginLeft: 14 }}>
                            <CircleImage
                                src={`http://localhost:5000/uploads/stores${store?.logoImg}`}
                            />
                        </div>
                    </RowLayout>
                    <RowLayout>
                        <SubTitle>가맹점 이름:</SubTitle>
                        <Text>{store?.name}</Text>
                    </RowLayout>
                    <RowLayout>
                        <SubTitle>가맹점 설명:</SubTitle>
                        <Text>{store?.description}</Text>
                    </RowLayout>
                    <RowLayout>
                        <SubTitle>가맹점 주소:</SubTitle>
                        <Text>{store?.address}</Text>
                    </RowLayout>
                    <RowLayout>
                        <SubTitle>가맹점 상세 주소:</SubTitle>
                        <Text>{store?.detailAddress}</Text>
                    </RowLayout>
                    <RowLayout>
                        <SubTitle>가맹점 카테고리:</SubTitle>
                        <Text>{store && getCategoryName(store.category)}</Text>
                    </RowLayout>
                    <RowLayout>
                        <SubTitle>가맹점 사이트 주소:</SubTitle>
                        <Text>{store?.webUrl}</Text>
                    </RowLayout>
                    <RowLayout>
                        <SubTitle>가맹점 인증여부:</SubTitle>

                        {verificationStatus === "ACCEPTED" ? (
                            <TextButton
                                noMargin={true}
                                color={COLORS.greenNormal}
                            >
                                인증된 사업자입니다.
                            </TextButton>
                        ) : verificationStatus === "REQUESTING" ? (
                            <TextButton
                                noMargin={true}
                                color={COLORS.blueNormal}
                            >
                                인증 진행중입니다.
                            </TextButton>
                        ) : verificationStatus === "NOT_VERIFIED" ? (
                            <TextButton
                                noMargin={true}
                                color={COLORS.blueNormal}
                                onClick={onShowBizRegModal}
                            >
                                인증이 필요합니다.
                            </TextButton>
                        ) : (
                            <TextButton
                                noMargin={true}
                                color={COLORS.redNormal}
                                onClick={onShowBizRegModal}
                            >
                                인증이 거절되었습니다.
                            </TextButton>
                        )}
                    </RowLayout>
                    <RowLayout>
                        <div style={{ width: 100, marginLeft: 14 }}>
                            <Button
                                title={"수정하기"}
                                onClick={goToStoreEditor}
                            />
                        </div>
                    </RowLayout>
                </ColumnLayout>
            )}
        </BoxContainer>
    )
}

export default StoreDetail
