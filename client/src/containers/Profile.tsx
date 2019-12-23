import * as React from "react"
import useOwnerInfo from "src/hooks/useOwnerInfo"
import Title from "src/components/Title"
import SubTitle from "src/components/SubTitle"
import ColumnLayout from "src/components/ColumnLayout"
import RowLayout from "src/components/RowLayout"
import Text from "src/components/Text"
import { COLORS } from "src/constants"
import BoxContainer from "src/components/BoxContainer"

interface ProfileProps {}

const Profile: React.SFC<ProfileProps> = () => {
    const { me } = useOwnerInfo()

    return (
        <BoxContainer>
            <ColumnLayout>
                <Title>점주 정보</Title>
                <RowLayout>
                    <SubTitle>이름</SubTitle>
                    <Text color={COLORS.blueNormal}>{me.name}</Text>
                </RowLayout>
                <RowLayout>
                    <SubTitle>이메일</SubTitle>
                    <Text color={COLORS.blueNormal}>{me.email}</Text>
                </RowLayout>
            </ColumnLayout>
        </BoxContainer>
    )
}

export default Profile
