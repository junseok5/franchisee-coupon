import * as React from "react"
import HeaderLayout from "src/components/HeaderLayout"
import useRegisterModal from "src/hooks/useRegisterModal"
import useLoginModal from "src/hooks/useLoginModal"
import useOwnerInfo from "src/hooks/useOwnerInfo"
import { Link } from "react-router-dom"
import { PAGE_PATHS } from "src/constants"
import RowLayout from "src/components/RowLayout"
import TextButton from "src/components/TextButton"
import useLogOut from "src/hooks/useLogOut"

interface HeaderProps {}

const Header: React.SFC<HeaderProps> = () => {
    const { onShowRegisterModal } = useRegisterModal()
    const { onShowLoginModal } = useLoginModal()
    const { me } = useOwnerInfo()
    const { logOut } = useLogOut()

    return (
        <HeaderLayout>
            <div className="left">
                <Link to={PAGE_PATHS.HOME}>Logo</Link>
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
