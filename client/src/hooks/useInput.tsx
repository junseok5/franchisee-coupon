import { useCallback, useState } from "react"

export default function useInput(defaultValue?: string | number) {
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
    const resetValue = useCallback(() => {
        setValue(defaultValue)
    }, [])

    return [value, onChange, resetValue] as [
        string,
        typeof onChange,
        typeof resetValue
    ]
}
