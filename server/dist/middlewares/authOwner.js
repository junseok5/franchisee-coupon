"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = (req, res, next) => {
    const owner = req.owner;
    if (!owner) {
        return res.status(401).send("로그인이 필요합니다.");
    }
    return next();
};
//# sourceMappingURL=authOwner.js.map