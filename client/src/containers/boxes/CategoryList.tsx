import * as React from "react"
import styled from 'styled-components'
import {
    MdCake,
    MdHeadsetMic,
    MdHotel,
    MdLocalCafe,
    MdLocalGroceryStore,
    MdLocalHospital,
    MdRestaurant,
    MdHome
} from "react-icons/md"
import Category from "../../components/boxes/Category"
import { useParams, useHistory } from "react-router-dom"
import { PAGE_PATHS, COLORS } from "src/constants"

const CategoryList: React.SFC = () => {
    const { storeId } = useParams()
    const history = useHistory()

    const onClickCategory = React.useCallback((category: number) => {
        let uri = ""
        if (storeId) {
            if (category === -1) {
                // 홈으로 이동
                uri = `${PAGE_PATHS.HOME}${storeId}`
            } else {
                uri = `${PAGE_PATHS.HOME}${storeId}/categories/${category}`
            }
        } else {
            if (category === -1) {
                uri = `${PAGE_PATHS.HOME}`
            } else {
                uri = `${PAGE_PATHS.HOME}categories/${category}`
            }
        }

        history.push(uri)
    }, [])

    return (
        <Container>
            <Category
                icon={<MdHome />}
                name={"홈"}
                bgColor={"#1E77CF"}
                onClick={() => onClickCategory(-1)}
            />
            <Category
                icon={<MdRestaurant />}
                name={"음식점"}
                bgColor={"#FF8120"}
                onClick={() => onClickCategory(0)}
            />
            <Category
                icon={<MdLocalCafe />}
                name={"카페"}
                bgColor={"#FF8120"}
                onClick={() => onClickCategory(1)}
            />
            <Category
                icon={<MdLocalGroceryStore />}
                name={"편의점/마트"}
                bgColor={"#FFDD00"}
                onClick={() => onClickCategory(2)}
            />
            <Category
                icon={<MdCake />}
                name={"디저트"}
                bgColor={"#FF8120"}
                onClick={() => onClickCategory(3)}
            />
            <Category
                icon={<MdLocalHospital />}
                name={"병원/약국"}
                bgColor={"#FF5C8A"}
                onClick={() => onClickCategory(4)}
            />
            <Category
                icon={<MdHotel />}
                name={"숙박"}
                bgColor={"#CD40DC"}
                onClick={() => onClickCategory(5)}
            />
            <Category
                icon={<MdHeadsetMic />}
                name={"엔터테인먼트"}
                bgColor={"#18BAEC"}
                onClick={() => onClickCategory(6)}
            />
        </Container>
    )
}

export default CategoryList

 const Container = styled.div`
    margin-bottom: 1em;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    background-color: #fff;
    color: ${COLORS.grayTitle};
`