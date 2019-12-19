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
import Category from "../components/Category"

const CategoryList: React.SFC = () => {
    return (
        <>
            <Category icon={<MdRestaurant />} name={"음식점"} />
            <Category icon={<MdLocalCafe />} name={"카페"} />
            <Category
                icon={<MdLocalGroceryStore />}
                name={"편의점/마트"}
                bgColor={"#FFB900"}
            />
            <Category icon={<MdCake />} name={"디저트"} />
            <Category
                icon={<MdLocalHospital />}
                name={"병원/약국"}
                bgColor={"#FF7265"}
            />
            <Category icon={<MdHotel />} name={"숙박"} bgColor={"#D887E8"} />
            <Category
                icon={<MdHeadsetMic />}
                name={"엔터테인먼트"}
                bgColor={"#9AABBD"}
            />
        </>
    )
}

export default CategoryList
