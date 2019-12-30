import * as React from "react"
import HeaderLayout from "src/components/layout/HeaderLayout"
import useRegisterModal from "src/hooks/modal/useRegisterModal"
import useLoginModal from "src/hooks/modal/useLoginModal"
import useOwnerInfo from "src/hooks/owners/useOwnerInfo"
import { Link } from "react-router-dom"
import { PAGE_PATHS, COLORS } from "src/constants"
import RowLayout from "src/components/layout/RowLayout"
import TextButton from "src/components/elements/TextButton"
import useLogOut from "src/hooks/owners/useLogOut"

interface HeaderProps {}

const Header: React.SFC<HeaderProps> = () => {
    const { onShowRegisterModal } = useRegisterModal()
    const { onShowLoginModal } = useLoginModal()
    const { me } = useOwnerInfo()
    const { logOut } = useLogOut()

    return (
        <HeaderLayout>
            <div
                className="left"
                style={{
                    color: COLORS.main,
                    fontWeight: "bold",
                    cursor: "pointer"
                }}
            >
                <Link to={PAGE_PATHS.HOME}>In500m</Link>
            </div>
            <div className="right">
                {me ? (
                    <RowLayout>
                        <div className={"name"}>
                            <Link to={`${PAGE_PATHS.OWNER}/${me.num}`}>
                                <span>{me.name}</span>
                            </Link>
                            님 환영합니다.
                        </div>
                        <TextButton onClick={logOut}>로그아웃</TextButton>
                    </RowLayout>
                ) : (
                    <>
                        <div className="text" onClick={onShowLoginModal}>
                            로그인
                        </div>
                        <div className="text" onClick={onShowRegisterModal}>
                            회원가입
                        </div>
                    </>
                )}
            </div>
        </HeaderLayout>
    )
}

export default Header
