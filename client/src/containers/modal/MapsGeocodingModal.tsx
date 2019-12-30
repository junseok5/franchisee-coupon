import * as React from "react"
import styled from "styled-components"
import useMapsGeocodingModal from "src/hooks/modal/useMapsGeocodingModal"
import Modal from "src/components/boxes/Modal"
import useInput from "src/hooks/elements/useInput"
import Input from "src/components/elements/Input"
import RowLayout from "src/components/layout/RowLayout"
import Button from "src/components/elements/Button"
import useLoadMapsGeocoding from "src/hooks/etc/useLoadMapsGeocoding"
import useOwnerInfo from "src/hooks/owners/useOwnerInfo"
import { COLORS } from "src/constants"
import useAddress from "src/hooks/etc/useAddress"
import useLat from "src/hooks/etc/useLat"
import useLng from "src/hooks/etc/useLng"

const MapsGeocodingModal: React.SFC = () => {
    const { token } = useOwnerInfo()
    const {
        geocodingModalVisible,
        onHideGeocodingModal
    } = useMapsGeocodingModal()
    const [keyword, changeKeyword] = useInput("")
    const {
        isLoadingMapsGeocoding,
        mapsGeocoding,
        loadMapsGeocoding
    } = useLoadMapsGeocoding()
    const { changeAddress } = useAddress()
    const { changeLat } = useLat()
    const { changeLng } = useLng()

    const onClickSearchButton = React.useCallback(
        event => {
            event.preventDefault()
            
            if (!keyword) {
                return
            }

            loadMapsGeocoding({ token, query: keyword })
        },
        [keyword]
    )

    const onKeyPressEnter = React.useCallback(
        event => {
            if (event.key === "Enter") {
                loadMapsGeocoding({ token, query: keyword })
            }
        },
        [keyword]
    )

    const onClickAddressItem = React.useCallback(
        key => {
            const addressItem = mapsGeocoding[key]

            changeAddress(addressItem.jibunAddress)
            changeLng(addressItem.x)
            changeLat(addressItem.y)
            onHideGeocodingModal()
        },
        [mapsGeocoding]
    )

    return (
        <Modal
            title={"주소 검색하기"}
            show={geocodingModalVisible}
            onHideModal={onHideGeocodingModal}
        >
            <Container>
                <RowLayout>
                    <Input
                        placeholder={"주소 입력"}
                        value={keyword}
                        onChange={changeKeyword}
                        onKeyPress={onKeyPressEnter}
                    />
                    <div
                        style={{
                            width: 100,
                            marginLeft: 14,
                            marginBottom: 8
                        }}
                    >
                        <Button
                            title={"검색"}
                            loading={isLoadingMapsGeocoding}
                            onClick={onClickSearchButton}
                        />
                    </div>
                </RowLayout>
                <div className={"address-list"}>
                    {mapsGeocoding.map((addressItem, key) => (
                        <div
                            key={key}
                            className={"address-item"}
                            onClick={() => onClickAddressItem(key)}
                        >
                            <div className={"jibun-address"}>
                                {addressItem.jibunAddress}
                            </div>
                            <div className={"en-address"}>
                                {addressItem.englishAddress}
                            </div>
                        </div>
                    ))}
                </div>
            </Container>
        </Modal>
    )
}

export default MapsGeocodingModal

const Container = styled.div`
    .address-list {
        height: 100px;
        margin-top: 0.5em;
        margin-bottom: 0.5em;
        font-size: 0.9em;
        overflow-y: scroll;

        .address-item {
            padding: 0.4em;
            border-bottom: 1px solid ${COLORS.grayNormal};
            user-select: none;
            cursor: pointer;

            &:hover {
                background-color: ${COLORS.grayLight};
            }

            .en-address {
                font-size: 0.8em;
                color: ${COLORS.grayBold};
            }
        }
    }
`
