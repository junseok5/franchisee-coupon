export const login = async (req, res) => {
    const { password } = req.body
    const adminPwd = process.env.ADMIN_PWD

    if (password === adminPwd) {
        req.session.logged = true
        return res.send("관리자 로그인에 성공하였습니다.")
    }

    return res.status(401).send("비밀번호가 틀렸습니다.")
}

export const logout = async (req, res) => {
    req.session = null
    return res.send("관리자 로그아웃에 성공하였습니다.")
}
