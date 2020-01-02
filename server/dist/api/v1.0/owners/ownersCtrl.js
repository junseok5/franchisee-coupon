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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
const Owner_1 = __importDefault(require("../../../entities/Owner"));
exports.read = (req, res) => {
    // 점주 정보 조회
    const owner = req.owner;
    delete owner.password;
    return res.json(owner);
};
exports.listMyStore = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // 점주의 가맹점 리스트 조회
    const ownerId = req.owner.id;
    try {
        const owner = yield Owner_1.default.findOne({ id: ownerId }, { relations: ["stores"] });
        if (!owner) {
            return res.status(404).send("가맹주 정보가 존재하지 않습니다.");
        }
        const stores = owner.stores;
        return res.json(stores);
    }
    catch (e) {
        return next(e);
    }
});
exports.update = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // 점주 정보 수정
    const owner = req.owner;
    const ownerBody = req.body;
    const schema = joi_1.default.object().keys({
        name: joi_1.default.string()
            .min(2)
            .max(10),
        password: joi_1.default.string()
            .min(6)
            .max(30),
        email: joi_1.default.string().email()
    });
    const validation = joi_1.default.validate(ownerBody, schema);
    if (validation.error) {
        return res.status(400).send("유효하지 않은 값이 입력되었습니다.");
    }
    if (ownerBody.password) {
        owner.password = ownerBody.password;
        owner.save();
        delete ownerBody.password;
    }
    try {
        yield Owner_1.default.update({ id: owner.id }, Object.assign({}, ownerBody));
        return res.send("업데이트에 성공하였습니다.");
    }
    catch (e) {
        return next(e);
    }
});
exports.updatePassword = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const owner = req.owner;
    const body = req.body;
    const schema = joi_1.default.object().keys({
        currentPassword: joi_1.default.string().required(),
        newPassword: joi_1.default.string()
            .min(6)
            .max(30)
            .required()
    });
    const validation = joi_1.default.validate(body, schema);
    if (validation.error) {
        return res.status(400).send("유효하지 않은 값이 입력되었습니다.");
    }
    try {
        const isValidPassword = yield owner.comparePassword(body.currentPassword);
        if (isValidPassword) {
            owner.password = body.newPassword;
            owner.save();
            return res.send("비밀번호 변경에 성공하였습니다.");
        }
        else {
            return res.status(401).send("비밀번호가 틀렸습니다.");
        }
    }
    catch (e) {
        return next(e);
    }
});
exports.remove = (req, res) => {
    // 점주 정보와 점주와 관련된 모든 정보 삭제
};
//# sourceMappingURL=ownersCtrl.js.map