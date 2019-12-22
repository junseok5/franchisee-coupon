import * as React from "react"
import HeaderLayout from "src/components/HeaderLayout"
import useRegisterModal from "src/hooks/useRegisterModal"
import useLoginModal from "src/hooks/useLoginModal"
import useOwnerInfo from "src/hooks/useOwnerInfo"

interface HeaderProps {}

const Header: React.SFC<HeaderProps> = () => {
    const { onShowRegisterModal } = useRegisterModal()
    const { onShowLoginModal } = useLoginModal()
    const { me } = useOwnerInfo()

    return (
        <HeaderLayout>
            <div className="left">Logo</div>
            <div className="right">
                {me ? (
                    <div>
                        <span>{me.name}</span>님 환영합니다.
                    </div>
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
