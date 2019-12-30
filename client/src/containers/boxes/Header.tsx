import * as React from "react"
import HeaderLayout from "src/components/layout/HeaderLayout"
import useRegisterModal from "src/hooks/modal/useRegisterModal"
import useLoginModal from "src/hooks/modal/useLoginModal"
import useOwnerInfo from "src/hooks/owners/useOwnerInfo"
import { Link } from "react-router-dom"
import { PAGE_PATHS, COLORS } from "src/constants"
import RowLayout from "src/components/layout/RowLayout"
import TextButton from "src/components/elements/TextButton"
import SmallButton from "src/components/elements/SmallButton"

interface HeaderProps {}

const Header: React.SFC<HeaderProps> = () => {
    const { onShowRegisterModal } = useRegisterModal()
    const { onShowLoginModal } = useLoginModal()
    const { me } = useOwnerInfo()

    return (
        <HeaderLayout>
            <div className="left">
                <Link to={PAGE_PATHS.HOME}>
                    <span>In500m</span>
                </Link>
            </div>
            <div className="right">
                {me ? (
                    <RowLayout>
                        <div className={"name"}>
                            <Link to={`${PAGE_PATHS.OWNER}/${me.num}`}>
                                <span>내 가맹점 관리</span>
                            </Link>
                        </div>
                    </RowLayout>
                ) : (
                    <>
                        <div className={"pc-auth"}>
                            <SmallButton
                                title={"로그인"}
                                bgColor={COLORS.grayButton}
                                onClick={onShowLoginModal}
                            />
                            <SmallButton
                                title={"회원가입"}
                                onClick={onShowRegisterModal}
                            />
                        </div>
                        <div className={"mobile-auth"}>
                            <TextButton>로그인</TextButton>
                            <TextButton>회원가입</TextButton>
                        </div>
                    </>
                )}
            </div>
        </HeaderLayout>
    )
}

export default Header
