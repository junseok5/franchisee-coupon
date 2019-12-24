import * as React from "react"
import styled from "styled-components"
import UploadImageExample from "./UploadImageExample"
// import { COLORS } from "src/constants"

interface FileInputProps {
    buttonTitle?: string
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const FileInput: React.SFC<FileInputProps> = ({
    buttonTitle = "파일 업로드",
    onChange
}) => {
    return (
        <Container>
            <label htmlFor={"file-label"}>
                <UploadImageExample title={buttonTitle} />
            </label>
            <input
                type={"file"}
                id={"file-label"}
                accept={"image/*"}
                onChange={onChange}
            />
        </Container>
    )
}

export default FileInput

const Container = styled.div`
    width: 100px;
    height: 100px;
    margin-top: 1em;
    margin-bottom: 1em;

    label {
        width: 100%;
        height: 100%;
        cursor: pointer;
    }

    input {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        border: 0;
    }
`
