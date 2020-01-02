"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (req, res, next) => {
    if (!req.session.logged) {
        return res.status(401).send("관리자 로그인이 필요합니다.");
    }
    return next();
};
//# sourceMappingURL=authAdmin.js.map