import * as React from "react"
import { useEffect, useState } from "react"
import styled from "styled-components"
import UploadImageExample from "../components/UploadImageExample"
import Image from "src/components/Image"

interface FileInputProps {
    width?: string
    height?: string
    buttonTitle?: string
    file: File
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const FileInput: React.SFC<FileInputProps> = ({
    width = "100px",
    height = "100px",
    buttonTitle = "파일 업로드",
    file,
    onChange
}) => {
    const [previewImgUrl, changePreviewImgUrl] = useState()

    useEffect(() => {
        if (!file) {
            return
        }

        const blobUrl = window.URL.createObjectURL(file)
        changePreviewImgUrl(blobUrl)
    }, [file])

    return (
        <Container width={width} height={height}>
            <label htmlFor={"file-label"}>
                {previewImgUrl ? (
                    <Image src={previewImgUrl} width={width} height={height} />
                ) : (
                    <UploadImageExample title={buttonTitle} />
                )}
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

interface StyledProps {
    width: string
    height: string
}

const Container = styled.div<StyledProps>`
    width: ${props => props.width};
    height: ${props => props.height};
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
