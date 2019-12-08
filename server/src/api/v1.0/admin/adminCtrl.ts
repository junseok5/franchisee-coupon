const adminPwd = process.env.ADMIN_PWD

export const login = async (req, res) => {
    const { password } = req.body

    if (password === adminPwd) {
        req.session.logged = true
        return res.json({ ok: true, msg: "SUCCESS_LOGIN" })
    }

    return res.status(401).json({
        ok: false,
        msg: "FAIL_LOGIN"
    })
}

export const logout = async (req, res) => {
    req.session = null
    return res.status(204)
}
