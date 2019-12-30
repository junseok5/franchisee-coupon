import { useState, useCallback, ChangeEvent } from "react"

export default function useInputFile() {
    const [fileName, setFileName] = useState("파일선택")
    const [file, setFile] = useState()

    const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        if (e.target.files !== null && e.target.files.length > 0) {
            setFileName(e.target.files[0].name)
            setFile(e.target.files[0])
        }
    }, [])

    return { fileName, file, onChange } as {
        fileName: string
        file: File
        onChange: typeof onChange
    }
}
