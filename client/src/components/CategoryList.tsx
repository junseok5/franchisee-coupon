import * as React from "react"
import {
    MdCake,
    MdDirectionsBus,
    MdHeadsetMic,
    MdHotel,
    MdLocalCafe,
    MdLocalFlorist,
    MdLocalGroceryStore,
    MdLocalHospital,
    MdLocalParking,
    MdRestaurant
} from "react-icons/md"
import styled from "styled-components"
import Category from "./Category"

const CategoryList: React.SFC = () => {
    return (
        <Styled>
            <Category icon={<MdRestaurant />} name={"음식점"} />
            <Category icon={<MdLocalCafe />} name={"카페"} />
            <Category
                icon={<MdLocalGroceryStore />}
                name={"편의점/마트"}
                bgColor={"#FFB900"}
            />
            <Category
                icon={<MdDirectionsBus />}
                name={"대중교통"}
                bgColor={"#3FB3FF"}
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
            <Category
                icon={<MdLocalFlorist />}
                name={"생활"}
                bgColor={"#9AABBD"}
            />
            <Category
                icon={<MdLocalParking />}
                name={"주유/주차"}
                bgColor={"#5C9ACE"}
            />
        </Styled>
    )
}

export default CategoryList

const Styled = styled.div`
    padding: 1em;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
`
