import * as React from "react"
// import Text from "src/components/Text"
import Input from "src/components/Input"
import useInput from "src/hooks/useInput"
import Select from 'src/components/Select'

const StoreForm: React.SFC = () => {
    const [name, changeName] = useInput("")

    return (
        <>
            <Input
                placeholder={"가맹점 이름"}
                value={name}
                onChange={changeName}
            />
            <Input
                placeholder={"가맹점 설명"}
                value={name}
                onChange={changeName}
            />
            <Input
                placeholder={"가맹점 설명"}
                value={name}
                onChange={changeName}
            />
            <Select>
                <option value={"음식점"}>음식점</option>
                <option value={"카페"}>카페</option>
                <option value={"편의점/마트"}>편의점/마트</option>
                <option value={"디저트"}>디저트</option>
                <option value={"음식점"}>음식점</option>
                <option value={"음식점"}>음식점</option>
                <option value={"음식점"}>음식점</option>
            </Select>
        </>
    )
}

export default StoreForm
