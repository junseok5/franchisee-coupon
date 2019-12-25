import * as React from "react"
import styled from "styled-components"
import Title from "./Title"
import { COLORS } from "src/constants"
import CircleImage from "./CircleImage"
import RowLayout from "./RowLayout"
import Text from "./Text"

interface MyStoreProps {
    logoImg: string
    name: string
    category: string
    description: string
}

const MyStore: React.SFC<MyStoreProps> = ({
    logoImg,
    name,
    category,
    description
}) => {
    return (
        <Container>
            <RowLayout>
                <CircleImage src={logoImg} />
                <Title>{name}</Title>
            </RowLayout>
            <Text>업종: {category}</Text>
            <Text>{description}</Text>
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
