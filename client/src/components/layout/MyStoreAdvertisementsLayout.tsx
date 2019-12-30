import * as React from "react"
import styled from "styled-components"

interface MyStoreAdvertisementsLayoutProps {}

const MyStoreAdvertisementsLayout: React.SFC<MyStoreAdvertisementsLayoutProps> = ({
    children
}) => {
    return <Container>{children}</Container>
}

export default MyStoreAdvertisementsLayout

const Container = styled.div`
    display: flex;
    flex-wrap: wrap;
`
