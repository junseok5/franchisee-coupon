import * as React from "react"
import styled from "styled-components"
import { IStore } from "src/store/reducers/store"
import CircleImage from "../../components/elements/CircleImage"
import { storageURL } from "src/constants"
import SubTitle from "../../components/elements/SubTitle"
import Image from "../../components/elements/Image"
import Button from "src/components/elements/Button"

interface VerificationStoreProps {
    store: IStore
}

const VerificationStore: React.SFC<VerificationStoreProps> = ({ store }) => {
    return (
        <Container>
            <div className={"header"}>
                <CircleImage src={`${storageURL}/stores${store.logoImg}`} />
                <SubTitle>{store.name}</SubTitle>
            </div>
            <div className={"biz-reg-img"}>
                <Image
                    src={`${storageURL}/stores${store.verificationStore?.bizRegImg}`}
                />
            </div>
            <Button title={"인증 수락"} />
        </Container>
    )
}

export default VerificationStore

const Container = styled.div`
    width: 320px;
`
