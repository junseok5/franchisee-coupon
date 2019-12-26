import * as React from "react"
import { useEffect } from "react"
import BoxContainer from "src/components/BoxContainer"
import ColumnLayout from "src/components/ColumnLayout"
import Title from "src/components/Title"
import RowLayout from "src/components/RowLayout"
import SubTitle from "src/components/SubTitle"
import { COLORS } from "src/constants"
import Text from "src/components/Text"
import useLoadStore from "src/hooks/useLoadStore"
import Loading from "src/components/Loading"
import { useParams } from "react-router-dom"
import useOwnerInfo from "src/hooks/useOwnerInfo"
import getCategoryName from "src/utils/getCategoryName"
import TextButton from "src/components/TextButton"
import useBizRegModal from "src/hooks/useBizRegModal"

interface StoreDetailProps {}

const StoreDetail: React.SFC<StoreDetailProps> = () => {
    const { isLoadingStore, store, loadStore } = useLoadStore()
    const { id } = useParams()
    const { token } = useOwnerInfo()
    const { onShowBizRegModal } = useBizRegModal()

    let verificationStatus

    if (store && store.verificationStore) {
        verificationStatus = store.verificationStore.status
    }

    useEffect(() => {
        loadStore({ id, token })
    }, [])

    return (
        <BoxContainer height={342}>
            {isLoadingStore ? (
                <Loading />
            ) : (
                <ColumnLayout>
                    <Title>가맹점 정보</Title>
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
                                color={COLORS.blueNormal}
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
                                color={COLORS.blueNormal}
                                onClick={onShowBizRegModal}
                            >
                                인증이 거절되었습니다.
                            </TextButton>
                        )}
                    </RowLayout>
                </ColumnLayout>
            )}
        </BoxContainer>
    )
}

export default StoreDetail
