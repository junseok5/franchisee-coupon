import * as React from "react"
import { useEffect, useCallback } from "react"
import Input from "src/components/Input"
import useInput from "src/hooks/useInput"
import Select from "src/components/Select"
import useInputFile from "src/hooks/useInputFile"
import FileInput from "src/containers/FileInput"
import Button from "src/components/Button"
import { regex, PAGE_PATHS } from "src/constants"
import useAddStore from "src/hooks/useAddStore"
import useOwnerInfo from "src/hooks/useOwnerInfo"
import ErrorText from "src/components/ErrorText"
import { useHistory } from "react-router-dom"

const StoreForm: React.SFC = () => {
    const [name, changeName] = useInput("")
    const [description, changeDescription] = useInput("")
    const [category, changeCategory] = useInput(0)
    const { file: logoImg, onChange: changeLogoImg } = useInputFile()
    const [webUrl, changeWebUrl] = useInput("")
    const [address, changeAddress] = useInput("")
    const [detailAddress, changeDetailAddress] = useInput("")
    const [lat, changeLat] = useInput(0)
    const [lng, changeLng] = useInput(0)
    const {
        isAddingStore,
        addStoreErrorMessage,
        storeAdded,
        addStore
    } = useAddStore()
    const {
        token,
        me: { num }
    } = useOwnerInfo()
    const history = useHistory()

    useEffect(() => {
        if (storeAdded) {
            alert("가맹점 등록에 성공하였습니다.")
            history.push(`${PAGE_PATHS.OWNER}/${num}`)
        }
    }, [storeAdded])

    const checkStoreFormValidation = useCallback(() => {
        if (!name) {
            return {
                ok: false,
                alertMessage: "가맹점 이름을 입력해주세요."
            }
        } else if (!description) {
            return {
                ok: false,
                alertMessage: "가맹점 설명을 입력해주세요."
            }
        } else if (!regex.storeName.test(name)) {
            return {
                ok: false,
                alertMessage: "가맹점 이름은 1~30자 입니다."
            }
        } else {
            return {
                ok: true
            }
        }
    }, [name, description, category])

    const submitForm = useCallback(() => {
        const validation = checkStoreFormValidation()

        if (!validation.ok) {
            alert(validation.alertMessage)
            return
        }

        const formData = new FormData()
        formData.append("name", name)
        formData.append("description", description)
        formData.append("category", category)
        formData.append("logoImg", logoImg)
        formData.append("webUrl", webUrl)
        formData.append("address", address)
        formData.append("detailAddress", detailAddress)
        formData.append("lat", lat)
        formData.append("lng", lng)

        addStore({ formData, token })
    }, [
        name,
        description,
        category,
        logoImg,
        webUrl,
        address,
        detailAddress,
        lat,
        lng
    ])

    const onClickSubmitButton = useCallback(
        event => {
            event.preventDefault()
            event.stopPropagation()

            submitForm()
        },
        [
            name,
            description,
            category,
            logoImg,
            webUrl,
            address,
            detailAddress,
            lat,
            lng
        ]
    )

    const onPressEnter = useCallback(
        event => {
            if (event.key === "Enter") {
                submitForm()
            }
        },
        [
            name,
            description,
            category,
            logoImg,
            webUrl,
            address,
            detailAddress,
            lat,
            lng
        ]
    )

    return (
        <>
            <FileInput
                buttonTitle={"로고 사진"}
                file={logoImg}
                onChange={changeLogoImg}
            />
            <Input
                placeholder={"가맹점 이름"}
                value={name}
                onChange={changeName}
            />
            <Input
                placeholder={"가맹점 설명"}
                value={description}
                onChange={changeDescription}
            />
            <Select value={category} onChange={changeCategory}>
                <option value={0}>음식점</option>
                <option value={1}>카페</option>
                <option value={2}>편의점/마트</option>
                <option value={3}>디저트</option>
                <option value={4}>음식점</option>
                <option value={5}>음식점</option>
                <option value={6}>음식점</option>
            </Select>
            <Input
                placeholder={"사이트 주소"}
                value={webUrl}
                onChange={changeWebUrl}
            />
            <Input
                placeholder={"가맹점 주소"}
                value={address}
                onChange={changeAddress}
            />
            <Input
                placeholder={"가맹점 상세주소"}
                value={detailAddress}
                onChange={changeDetailAddress}
            />
            <Input placeholder={"latitude"} value={lat} onChange={changeLat} />
            <Input
                placeholder={"longitude"}
                value={lng}
                onChange={changeLng}
                onKeyPress={onPressEnter}
            />
            <ErrorText>{addStoreErrorMessage}</ErrorText>
            <Button
                title={"등록하기"}
                loading={isAddingStore}
                onClick={onClickSubmitButton}
            />
        </>
    )
}

export default StoreForm
