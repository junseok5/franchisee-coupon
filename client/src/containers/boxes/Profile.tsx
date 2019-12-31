import * as React from "react"
import useOwnerInfo from "src/hooks/owners/useOwnerInfo"
import Title from "src/components/elements/Title"
import SubTitle from "src/components/elements/SubTitle"
import ColumnLayout from "src/components/layout/ColumnLayout"
import RowLayout from "src/components/layout/RowLayout"
import Text from "src/components/elements/Text"
import { COLORS, PAGE_PATHS } from "src/constants"
import BoxContainer from "src/components/boxes/BoxContainer"
import useLogOut from "src/hooks/owners/useLogOut"
import TextButton from "src/components/elements/TextButton"
import RowBetweenLayout from "src/components/layout/RowBetweenLayout"
import SmallButton from "src/components/elements/SmallButton"
import RowWrap from "src/components/wrap/RowWrap"
import { useParams, useHistory } from "react-router-dom"

const Profile: React.SFC = () => {
    const { me } = useOwnerInfo()
    const { logOut } = useLogOut()
    const { ownerId } = useParams()
    const history = useHistory()

    React.useEffect(() => {
        if (me.num !== Number(ownerId)) {
            history.push(`${PAGE_PATHS.OWNER}/${me.num}`)
        }
    }, [])

    return (
        <BoxContainer minHeight={200}>
            <ColumnLayout>
                <RowBetweenLayout>
                    <Title>점주 정보</Title>
                    <RowLayout>
                        <SmallButton
                            title={"수정하기"}
                            bgColor={COLORS.grayButton}
                        />
                        <TextButton onClick={logOut}>로그아웃</TextButton>
                    </RowLayout>
                </RowBetweenLayout>
                <RowLayout>
                    <SubTitle>아이디</SubTitle>
                    <RowWrap>
                        <Text>{me.id}</Text>
                    </RowWrap>
                </RowLayout>
                <RowLayout>
                    <SubTitle>이름</SubTitle>
                    <RowWrap>
                        <Text>{me.name}</Text>
                    </RowWrap>
                </RowLayout>
                <RowLayout>
                    <SubTitle>이메일</SubTitle>
                    <RowWrap>
                        <Text>{me.email}</Text>
                    </RowWrap>
                </RowLayout>
            </ColumnLayout>
        </BoxContainer>
    )
}

export default Profile
