import * as React from "react"
import styled from "styled-components"
import Title from "./Title"
import { COLORS } from "src/constants"
import CircleImage from "./CircleImage"
import RowLayout from "./RowLayout"

interface MyStoreProps {}

const MyStore: React.SFC<MyStoreProps> = () => {
    return (
        <Container>
            <RowLayout>
                <CircleImage
                    src={
                        "https://media-cdn.tripadvisor.com/media/photo-s/13/49/41/b8/starbucks.jpg"
                    }
                />
                <Title>가맹점 이름</Title>
            </RowLayout>

        </Container>
    )
}

export default MyStore

const Container = styled.div`
    width: 238px;
    height: 238px;
    padding: 0.5em;
    margin: 14px;
    border: 1px solid ${COLORS.grayNormal};
    user-select: none;
    cursor: pointer;
    transition: all 0.2s;

    @media screen and (max-width: 768px) {
        width: 100%;
        height: auto;
    }
`
