import * as React from "react"
import { useCallback, useEffect } from "react"
import useBizRegModal from "src/hooks/useBizRegModal"
import Modal from "src/components/Modal"
import FileInput from "src/containers/FileInput"
import useInputFile from "src/hooks/useInputFile"
import Button from "src/components/Button"
import useAddBizRegImg from "src/hooks/useAddBizRegImg"
import useLoadStore from "src/hooks/useLoadStore"
import useOwnerInfo from "src/hooks/useOwnerInfo"
import ErrorText from "src/components/ErrorText"
import { useParams } from 'react-router-dom'

interface BizRegModalProps {}

const BizRegModal: React.SFC<BizRegModalProps> = () => {
    const { bizRegModalVisible, onHideBizRegModal } = useBizRegModal()
    const { file: bizRegImg, onChange: changeBizRegImg } = useInputFile()
    const {
        isAddingBizRegImg,
        addedBizRegImg,
        addBizRegImgErrorMessage,
        addBizRegImg
    } = useAddBizRegImg()
    const { id } = useParams()
    const { store } = useLoadStore()
    const { token } = useOwnerInfo()
    const { loadStore } = useLoadStore()

    useEffect(() => {
        if (addedBizRegImg) {
            alert("사업자 인증서 제출에 성공하였습니다.")
            onHideBizRegModal()
            loadStore({ id, token })
        }
    }, [addedBizRegImg])

    const submitBizRegImg = useCallback(() => {
        if (!bizRegImg) {
            alert("사업자 인증서 사진을 넣어주세요.")
            return
        } else if (!store) {
            alert("오류가 발생했습니다. 다시 한번 시도해주세요.")
            return
        }

        const storeId = store.id

        const formData = new FormData()
        formData.append("bizRegImg", bizRegImg)

        addBizRegImg({ storeId, formData, token })
    }, [bizRegImg])

    const onClickUploadButton = useCallback(
        event => {
            event.preventDefault()
            event.stopPropagation()

            submitBizRegImg()
        },
        [bizRegImg]
    )

    return (
        <Modal
            title={"사업자 인증서 등록"}
            show={bizRegModalVisible}
            onHideModal={onHideBizRegModal}
        >
            <FileInput
                width={"100%"}
                height={"320px"}
                buttonTitle={"인증서 사진 업로드"}
                file={bizRegImg}
                onChange={changeBizRegImg}
            />
            <ErrorText>{addBizRegImgErrorMessage}</ErrorText>
            <Button
                title={"인증 요청하기"}
                loading={isAddingBizRegImg}
                onClick={onClickUploadButton}
            />
        </Modal>
    )
}

export default BizRegModal
