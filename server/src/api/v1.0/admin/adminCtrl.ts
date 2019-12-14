import { moreInfo } from "../../../constants"

export const login = async (req, res) => {
    const { password } = req.body
    const adminPwd = process.env.ADMIN_PWD

    if (password === adminPwd) {
        req.session.logged = true
        return res.json({
            ok: true,
            client_message: "Success to login admin",
            server_message: "관리자 로그인에 성공하였습니다."
        })
    }

    return res.status(401).json({
        ok: false,
        client_message: "비밀번호가 틀립니다.",
        server_message: "Password is not valid",
        code: 1,
        more_info: moreInfo
    })
}

export const logout = async (req, res) => {
    req.session = null
    return res.json({
        ok: true,
        client_message: "Success to logout admin",
        server_message: "관리자 로그아웃에 성공하였습니다."
    })
}
