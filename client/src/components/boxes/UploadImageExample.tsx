import * as React from "react"
import styled from "styled-components"
import { COLORS } from "src/constants"
import { FiImage } from "react-icons/fi"

interface UploadImageExampleProps {
    title: string
}

const UploadImageExample: React.SFC<UploadImageExampleProps> = ({ title }) => {
    return (
        <Container>
            <div className={"wrap"}>
                <div className={"icon"}>
                    <FiImage size={24} />
                </div>
                <div className={"text"}>{title}</div>
            </div>
        </Container>
    )
}

export default UploadImageExample

const Container = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: ${COLORS.grayLight};
    border-radius: 4px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

    .wrap {
        color: ${COLORS.grayBold};

        .icon {
            display: flex;
            justify-content: center;
            margin-bottom: 0.5em;
        }

        .text {
            text-align: center;
        }
    }
`
