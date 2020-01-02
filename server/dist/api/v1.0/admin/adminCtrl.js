"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { password } = req.body;
    const adminPwd = process.env.ADMIN_PWD;
    if (password === adminPwd) {
        req.session.logged = true;
        return res.send("관리자 로그인에 성공하였습니다.");
    }
    return res.status(401).send("비밀번호가 틀렸습니다.");
});
exports.logout = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    req.session = null;
    return res.send("관리자 로그아웃에 성공하였습니다.");
});
//# sourceMappingURL=adminCtrl.js.map