import * as React from "react"
import {
    MdCake,
    MdHeadsetMic,
    MdHotel,
    MdLocalCafe,
    MdLocalGroceryStore,
    MdLocalHospital,
    MdRestaurant
} from "react-icons/md"
import Category from "../../components/boxes/Category"
import { useParams, useHistory } from "react-router-dom"
import { PAGE_PATHS } from "src/constants"

const CategoryList: React.SFC = () => {
    const { storeId } = useParams()
    const history = useHistory()

    const onClickCategory = React.useCallback((category: number) => {
        let uri = ""
        if (storeId) {
            uri = `${PAGE_PATHS.HOME}${storeId}/categories/${category}`
        } else {
            uri = `${PAGE_PATHS.HOME}categories/${category}`
        }

        history.push(uri)
    }, [])

    return (
        <>
            <Category
                icon={<MdRestaurant />}
                name={"음식점"}
                onClick={() => onClickCategory(0)}
            />
            <Category
                icon={<MdLocalCafe />}
                name={"카페"}
                onClick={() => onClickCategory(1)}
            />
            <Category
                icon={<MdLocalGroceryStore />}
                name={"편의점/마트"}
                bgColor={"#FFB900"}
                onClick={() => onClickCategory(2)}
            />
            <Category
                icon={<MdCake />}
                name={"디저트"}
                onClick={() => onClickCategory(3)}
            />
            <Category
                icon={<MdLocalHospital />}
                name={"병원/약국"}
                bgColor={"#FF7265"}
                onClick={() => onClickCategory(4)}
            />
            <Category
                icon={<MdHotel />}
                name={"숙박"}
                bgColor={"#D887E8"}
                onClick={() => onClickCategory(5)}
            />
            <Category
                icon={<MdHeadsetMic />}
                name={"엔터테인먼트"}
                bgColor={"#9AABBD"}
                onClick={() => onClickCategory(6)}
            />
        </>
    )
}

export default CategoryList
