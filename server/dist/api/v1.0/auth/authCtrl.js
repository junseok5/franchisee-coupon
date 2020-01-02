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
const createJWT_1 = __importDefault(require("../../../utils/createJWT"));
exports.register = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, id, password, email } = req.body;
    const schema = joi_1.default.object().keys({
        name: joi_1.default.string()
            .min(2)
            .max(10)
            .required(),
        id: joi_1.default.string()
            .min(2)
            .max(30)
            .required(),
        password: joi_1.default.string()
            .min(6)
            .max(30)
            .required(),
        email: joi_1.default.string()
            .email()
            .required()
    });
    const validation = joi_1.default.validate(req.body, schema);
    if (validation.error) {
        console.error(validation.error);
        return res.status(400).send("유효하지 않은 입력 값이 존재합니다.");
    }
    try {
        const existingOwner = yield Owner_1.default.find({
            where: [{ id }, { email }]
        });
        if (existingOwner.length) {
            return res.status(401).send("이미 존재하는 계정입니다.");
        }
        const owner = yield Owner_1.default.create({
            name,
            id,
            password,
            email
        }).save();
        const token = createJWT_1.default(owner.num);
        delete owner.password;
        return res.json({ owner, token });
    }
    catch (e) {
        return next(e);
    }
});
exports.login = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, password } = req.body;
    const schema = joi_1.default.object({
        id: joi_1.default.string()
            .min(2)
            .max(30)
            .required(),
        password: joi_1.default.string()
            .min(6)
            .max(30)
    });
    const validation = joi_1.default.validate(req.body, schema);
    if (validation.error) {
        console.error(validation.error);
        return res.status(400).send("유효하지 않은 입력 값이 존재합니다.");
    }
    try {
        const owner = yield Owner_1.default.findOne({ id });
        if (!owner) {
            return res.status(401).send("아이디가 존재하지 않습니다.");
        }
        const isValidPassword = yield owner.comparePassword(password);
        if (isValidPassword) {
            const token = createJWT_1.default(owner.num);
            delete owner.password;
            return res.json({ owner, token });
        }
        else {
            return res.status(401).send("비밀번호가 잘못되었습니다.");
        }
    }
    catch (e) {
        return next(e);
    }
});
exports.check = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const owner = req.owner;
    if (!owner) {
        return res.status(401).send("로그인이 되어있지 않습니다.");
    }
    const token = createJWT_1.default(owner.num);
    delete owner.password;
    return res.json({ owner, token });
});
//# sourceMappingURL=authCtrl.js.map