import * as React from "react"
import { useEffect, useCallback } from "react"
import { Helmet } from "react-helmet"
import Input from "src/components/elements/Input"
import useInput from "src/hooks/elements/useInput"
import Select from "src/components/elements/Select"
import useInputFile from "src/hooks/elements/useInputFile"
import FileInput from "src/containers/elements/FileInput"
import Button from "src/components/elements/Button"
import { regex, PAGE_PATHS } from "src/constants"
import useAddStore from "src/hooks/store/useAddStore"
import useOwnerInfo from "src/hooks/owners/useOwnerInfo"
import ErrorText from "src/components/elements/ErrorText"
import { useHistory, useParams } from "react-router-dom"
import useLoadStore from "src/hooks/store/useLoadStore"
import useUpdateStore from "src/hooks/store/useUpdateStore"
import useMapsGeocodingModal from "src/hooks/modal/useMapsGeocodingModal"
import useAddress from "src/hooks/etc/useAddress"
import useLat from "src/hooks/etc/useLat"
import useLng from "src/hooks/etc/useLng"
import BoxContainer from "src/components/boxes/BoxContainer"
import Title from "src/components/elements/Title"

const StoreForm: React.SFC = () => {
    const { storeId } = useParams()
    const [name, changeName, , setName] = useInput("")
    const [description, changeDescription, , setDescription] = useInput("")
    const [category, changeCategory, , setCategory] = useInput(0)
    const { file: logoImg, onChange: changeLogoImg } = useInputFile()
    const [webUrl, changeWebUrl, , setWebUrl] = useInput("")
    const { address, changeAddress } = useAddress()
    const [detailAddress, changeDetailAddress, , setDetailAddress] = useInput(
        ""
    )
    const { lat, changeLat } = useLat()
    const { lng, changeLng } = useLng()
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
    const { store } = useLoadStore()
    const {
        isUpdatingStore,
        updateStoreErrorMessage,
        storeUpdated,
        updateStore
    } = useUpdateStore()
    const { onShowGeocodingModal } = useMapsGeocodingModal()

    useEffect(() => {
        if (storeAdded) {
            alert("가맹점 등록에 성공하였습니다.")
            history.push(`${PAGE_PATHS.OWNER}/${num}`)
        }
    }, [storeAdded, storeUpdated])

    useEffect(() => {
        if (storeUpdated) {
            alert("가맹점 정보 수정에 성공하였습니다.")
            history.push(`${PAGE_PATHS.STORE_DETAIL}/${storeId}`)
        }
    }, [storeUpdated])

    useEffect(() => {
        if (storeId && store && Number(storeId) === store.id) {
            setName(store.name)
            setDescription(store.description)
            setCategory(store.category)
            setWebUrl(store.webUrl)
            changeAddress(store.address)
            setDetailAddress(store.detailAddress)
            changeLat(store.lat)
            changeLng(store.lng)
        } else if (storeId && !store) {
            history.push(PAGE_PATHS.HOME)
        }
    }, [])

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
        formData.append("lat", String(lat))
        formData.append("lng", String(lng))

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

    const submitUpdatedForm = useCallback(() => {
        const validation = checkStoreFormValidation()

        if (!validation.ok) {
            alert(validation.alertMessage)
            return
        }

        const formData = new FormData()
        formData.append("name", name)
        formData.append("description", description)
        formData.append("category", category)
        formData.append("webUrl", webUrl)
        formData.append("address", address)
        formData.append("detailAddress", detailAddress)
        formData.append("lat", String(lat))
        formData.append("lng", String(lng))

        if (logoImg) {
            formData.append("logoImg", logoImg)
        }

        if (storeId) {
            updateStore({ id: storeId, formData, token })
        }
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

    const onClickUpdateButton = useCallback(
        event => {
            event.preventDefault()
            event.stopPropagation()

            submitUpdatedForm()
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
        <BoxContainer>
            <Title>가맹점 {storeId ? "수정하기" : "등록하기"}</Title>
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
                <option value={4}>병원/약국</option>
                <option value={5}>숙박</option>
                <option value={6}>엔터테인먼트</option>
            </Select>
            <Input
                placeholder={"사이트 주소"}
                value={webUrl}
                onChange={changeWebUrl}
            />

            <div style={{ display: "flex", alignItems: "center" }}>
                <Input
                    placeholder={"가맹점 주소"}
                    value={address}
                    onChange={changeAddress}
                    disabled={true}
                />
                <div
                    style={{
                        width: 100,
                        marginLeft: 14,
                        marginBottom: 8,
                        display: "flex",
                        justifyContent: "center"
                    }}
                >
                    <Button
                        title={"주소 검색"}
                        onClick={onShowGeocodingModal}
                    />
                </div>
            </div>
            <Input
                placeholder={"가맹점 상세주소"}
                value={detailAddress}
                onChange={changeDetailAddress}
            />
            {storeId ? (
                <>
                    <ErrorText>{updateStoreErrorMessage}</ErrorText>
                    <Button
                        title={"수정하기"}
                        loading={isUpdatingStore}
                        onClick={onClickUpdateButton}
                    />
                </>
            ) : (
                <>
                    <ErrorText>{addStoreErrorMessage}</ErrorText>
                    <Button
                        title={"등록하기"}
                        loading={isAddingStore}
                        onClick={onClickSubmitButton}
                    />
                </>
            )}
            <Helmet>
                <title>{storeId ? "가맹점 수정" : "가맹점 등록"}</title>
            </Helmet>
        </BoxContainer>
    )
}

export default StoreForm
