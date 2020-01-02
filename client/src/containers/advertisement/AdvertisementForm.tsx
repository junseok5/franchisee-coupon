import * as React from "react"
import { useCallback, useEffect } from "react"
import { Helmet } from "react-helmet"
import useInputFile from "src/hooks/elements/useInputFile"
import FileInput from "../elements/FileInput"
import useInput from "src/hooks/elements/useInput"
import Input from "src/components/elements/Input"
import Select from "src/components/elements/Select"
import Button from "src/components/elements/Button"
import SubTitle from "src/components/elements/SubTitle"
import useAddAdvertisement from "src/hooks/advertisement/useAddAdvertisement"
import useOwnerInfo from "src/hooks/owners/useOwnerInfo"
import { useParams, useHistory } from "react-router-dom"
import ErrorText from "src/components/elements/ErrorText"
import { PAGE_PATHS } from "src/constants"
import useLoadStoreAdvertisements from "src/hooks/advertisement/useLoadStoreAdvertisements"
import useUpdateAdvertisement from "src/hooks/advertisement/useUpdateAdvertisement"
import BoxContainer from "src/components/boxes/BoxContainer"

const AdvertisementForm: React.SFC = () => {
    const { file: photo, onChange: changePhoto } = useInputFile()
    const [title, changeTitle, , setTitle] = useInput("")
    const [description, changeDescription, , setDescription] = useInput("")
    const [startAt, changeStartAt, , setStartAt] = useInput()
    const [endAt, changeEndAt, , setEndAt] = useInput()
    const [adType, changeAdType, , setAdType] = useInput("COUPON")
    const {
        isAddingAdvertisement,
        addAdvertisementErrorMessage,
        advertisementAdded,
        addAdvertisement
    } = useAddAdvertisement()
    const { token } = useOwnerInfo()
    const { storeId, adId } = useParams()
    const history = useHistory()
    const { storeAdvertisements } = useLoadStoreAdvertisements()
    const {
        isUpdatingAdvertisement,
        updateAdvertisementErrorMessage,
        advertisementUpdated,
        updateAdvertisement
    } = useUpdateAdvertisement()

    useEffect(() => {
        if (advertisementAdded) {
            alert("광고 등록에 성공하였습니다.")
            history.push(`${PAGE_PATHS.STORE_DETAIL}/${storeId}`)
        }
    }, [advertisementAdded])

    useEffect(() => {
        if (advertisementUpdated) {
            alert("광고 정보 수정에 성공하였습니다.")
            history.push(`${PAGE_PATHS.STORE_DETAIL}/${storeId}`)
        }
    }, [advertisementUpdated])

    useEffect(() => {
        const foundAd = storeAdvertisements.find(ad => ad.id === Number(adId))

        if (adId && foundAd) {
            setTitle(foundAd.title)
            setDescription(foundAd.description)
            setStartAt(foundAd.startAt)
            setEndAt(foundAd.endAt)
            setAdType(foundAd.adType)
        } else if (adId && !foundAd) {
            history.push(PAGE_PATHS.HOME)
        }
    }, [])

    const checkAdvertisementFormValidation = useCallback(() => {
        if (!title) {
            return {
                ok: false,
                alertMessage: "광고 제목을 입력해주세요."
            }
        } else if (!startAt) {
            return {
                ok: false,
                alertMessage: "광고 시작일을 입력해주세요."
            }
        } else if (!endAt) {
            return {
                ok: false,
                alertMessage: "광고 마감일을 입력해주세요."
            }
        } else if (endAt < startAt) {
            return {
                ok: false,
                alertMessage: "광고 마감일은 시작일보다 작을 수 없습니다."
            }
        } else {
            return {
                ok: true
            }
        }
    }, [title, startAt, endAt])

    const submitForm = useCallback(() => {
        const validation = checkAdvertisementFormValidation()

        if (!validation.ok) {
            alert(validation.alertMessage)
            return
        }

        const formData = new FormData()
        formData.append("title", title)
        formData.append("description", description)
        formData.append("startAt", startAt)
        formData.append("endAt", endAt)
        formData.append("adType", adType)
        formData.append("photo", photo)

        if (storeId) {
            addAdvertisement({ formData, token, storeId })
        }
    }, [title, description, startAt, endAt, photo, adType])

    const submitUpdatedForm = useCallback(() => {
        const validation = checkAdvertisementFormValidation()

        if (!validation.ok) {
            alert(validation.alertMessage)
            return
        }

        const formData = new FormData()
        formData.append("title", title)
        formData.append("description", description)
        formData.append("startAt", startAt)
        formData.append("endAt", endAt)
        formData.append("adType", adType)

        if (photo) {
            formData.append("photo", photo)
        }

        if (adId) {
            updateAdvertisement({ formData, token, adId })
        }
    }, [title, description, startAt, endAt, photo, adType])

    const onClickSubmitButton = useCallback(
        event => {
            event.preventDefault()
            event.stopPropagation()

            submitForm()
        },
        [title, description, startAt, endAt, photo, adType]
    )

    const onClickUpdateButton = useCallback(
        event => {
            event.preventDefault()
            event.stopPropagation()

            submitUpdatedForm()
        },
        [title, description, startAt, endAt, photo, adType]
    )

    return (
        <BoxContainer>
            <FileInput
                width={"160px"}
                height={"240px"}
                buttonTitle={"광고 사진 업로드 640x960"}
                file={photo}
                onChange={changePhoto}
            />
            <SubTitle noHorizontalMargin={true}>광고 제목</SubTitle>
            <Input placeholder={"입력"} value={title} onChange={changeTitle} />
            <SubTitle noHorizontalMargin={true}>광고 설명</SubTitle>
            <Input
                placeholder={"입력"}
                value={description}
                onChange={changeDescription}
            />
            <SubTitle noHorizontalMargin={true}>광고 시작일</SubTitle>
            <Input type={"date"} value={startAt} onChange={changeStartAt} />
            <SubTitle noHorizontalMargin={true}>광고 마감일</SubTitle>
            <Input type={"date"} value={endAt} onChange={changeEndAt} />
            <SubTitle noHorizontalMargin={true}>광고 유형</SubTitle>
            <Select value={adType} onChange={changeAdType}>
                <option value={"COUPON"}>쿠폰</option>
                <option value={"SPECIAL"}>특가</option>
            </Select>
            {adId ? (
                <>
                    <ErrorText>{updateAdvertisementErrorMessage}</ErrorText>
                    <Button
                        title={"수정하기"}
                        loading={isUpdatingAdvertisement}
                        onClick={onClickUpdateButton}
                    />
                </>
            ) : (
                <>
                    <ErrorText>{addAdvertisementErrorMessage}</ErrorText>
                    <Button
                        title={"등록하기"}
                        loading={isAddingAdvertisement}
                        onClick={onClickSubmitButton}
                    />
                </>
            )}
            <Helmet>
                <title>{adId ? "광고 수정" : "광고 등록"}</title>
            </Helmet>
        </BoxContainer>
    )
}

export default AdvertisementForm
