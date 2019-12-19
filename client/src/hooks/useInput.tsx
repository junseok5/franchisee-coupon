import { useCallback, useState } from "react"

export default function useInput(defaultValue?: string) {
    const [value, setValue] = useState(defaultValue)
    const onChange = useCallback(
        (
            e: React.ChangeEvent<
                HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
            >
        ) => {
            setValue(e.target.value)
        },
        []
    )

    return [value, onChange] as [string, typeof onChange]
}
