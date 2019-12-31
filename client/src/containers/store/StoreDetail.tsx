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
import CircleImage from "src/components/elements/CircleImage"
import RowBetweenLayout from "src/components/layout/RowBetweenLayout"
import SmallButton from "src/components/elements/SmallButton"
import RowWrap from "src/components/wrap/RowWrap"
import useRemoveStore from "src/hooks/store/useRemoveStore"

interface StoreDetailProps {}

const StoreDetail: React.SFC<StoreDetailProps> = () => {
    const { isLoadingStore, store, loadStore } = useLoadStore()
    const { storeId } = useParams()
    const {
        token,
        me: { num }
    } = useOwnerInfo()
    const { onShowBizRegModal } = useBizRegModal()
    const history = useHistory()
    const { storeRemoved, removeStore } = useRemoveStore()

    let verificationStatus

    if (store && store.verificationStore) {
        verificationStatus = store.verificationStore.status
    }

    useEffect(() => {
        loadStore({ id: storeId, token })
    }, [])

    useEffect(() => {
        if (storeRemoved) {
            alert("성공적으로 삭제하였습니다.")
            history.push(`${PAGE_PATHS.OWNER}/${num}`)
        }
    }, [storeRemoved])

    const onClickStoreRemoveButton = React.useCallback(() => {
        const confirmRemove = confirm("정말로 가맹점을 탈퇴하시겠습니까?")

        if (confirmRemove) {
            removeStore({ token, id: storeId })
        }
    }, [])

    const goToStoreEditor = React.useCallback(() => {
        history.push(`${PAGE_PATHS.STORE_EDITOR}/${storeId}`)
    }, [])

    return (
        <BoxContainer minHeight={320}>
            <RowBetweenLayout>
                <RowLayout>
                    <CircleImage
                        src={`http://localhost:5000/uploads/stores${store?.logoImg}`}
                    />
                    <RowWrap>
                        <Title>{store?.name}</Title>
                    </RowWrap>
                </RowLayout>
                <RowLayout>
                    <SmallButton title={"수정하기"} onClick={goToStoreEditor} />
                    <TextButton onClick={onClickStoreRemoveButton}>
                        가맹점 탈퇴하기
                    </TextButton>
                </RowLayout>
            </RowBetweenLayout>

            {isLoadingStore ? (
                <Loading minHeight={200} />
            ) : (
                <ColumnLayout>
                    <RowLayout>
                        <SubTitle>가맹점 설명</SubTitle>
                        <RowWrap>
                            <Text>{store?.description}</Text>
                        </RowWrap>
                    </RowLayout>
                    <RowLayout>
                        <SubTitle>가맹점 주소</SubTitle>
                        <RowWrap>
                            <Text>{store?.address}</Text>
                        </RowWrap>
                    </RowLayout>
                    <RowLayout>
                        <SubTitle>가맹점 상세 주소</SubTitle>
                        <RowWrap>
                            <Text>{store?.detailAddress}</Text>
                        </RowWrap>
                    </RowLayout>
                    <RowLayout>
                        <SubTitle>가맹점 카테고리</SubTitle>
                        <RowWrap>
                            <Text>
                                {store && getCategoryName(store.category)}
                            </Text>
                        </RowWrap>
                    </RowLayout>
                    <RowLayout>
                        <SubTitle>가맹점 사이트 주소</SubTitle>
                        <RowWrap>
                            <Text>{store?.webUrl}</Text>
                        </RowWrap>
                    </RowLayout>
                    <RowLayout>
                        <SubTitle>가맹점 인증여부</SubTitle>
                        <RowWrap>
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
                        </RowWrap>
                    </RowLayout>
                </ColumnLayout>
            )}
        </BoxContainer>
    )
}

export default StoreDetail
