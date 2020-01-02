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
const request_1 = __importDefault(require("request"));
const Store_1 = __importDefault(require("../../../entities/Store"));
const VerificationStore_1 = __importDefault(require("../../../entities/VerificationStore"));
exports.read = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    try {
        const store = yield Store_1.default.findOne({ id }, { relations: ["verificationStore"] });
        if (!store) {
            return res.status(404).send("가맹점이 존재하지 않습니다.");
        }
        delete store.owner;
        return res.json(store);
    }
    catch (e) {
        return next(e);
    }
});
exports.readMapGeocoding = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const query = req.query.query;
    const options = {
        uri: "https://naveropenapi.apigw.ntruss.com/map-geocode/v2/geocode",
        qs: {
            query
        },
        headers: {
            "X-NCP-APIGW-API-KEY-ID": process.env["X-NCP-APIGW-API-KEY-ID"],
            "X-NCP-APIGW-API-KEY": process.env["X-NCP-APIGW-API-KEY"]
        }
    };
    request_1.default(options, (err, response, body) => {
        if (err) {
            return next(err);
        }
        return res.json(JSON.parse(body));
    });
});
exports.write = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const storeBody = req.body;
    const owner = req.owner;
    const logoImg = req.file;
    const schema = joi_1.default.object().keys({
        name: joi_1.default.string()
            .min(1)
            .max(30)
            .required(),
        description: joi_1.default.string(),
        address: joi_1.default.string().required(),
        detailAddress: joi_1.default.string().required(),
        category: joi_1.default.number().required(),
        webUrl: joi_1.default.string().required(),
        lat: joi_1.default.number().required(),
        lng: joi_1.default.number().required()
    });
    const validation = joi_1.default.validate(storeBody, schema);
    if (validation.error) {
        console.error(validation.error);
        return res.status(400).send("유효하지 않은 입력 값이 존재합니다.");
    }
    if (logoImg) {
        storeBody.logoImg = `/${logoImg.filename}`;
    }
    try {
        const verificationStore = yield VerificationStore_1.default.create().save();
        const store = yield Store_1.default.create(Object.assign(Object.assign({}, storeBody), { owner,
            verificationStore })).save();
        return res.json(store);
    }
    catch (e) {
        return next(e);
    }
});
exports.update = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const owner = req.owner;
    const storeId = req.params.id;
    const storeBody = req.body;
    const logoImg = req.file;
    try {
        const store = yield Store_1.default.findOne({ id: storeId }, { relations: ["owner"] });
        if (!store) {
            return res.status(404).send("가맹점이 존재하지 않습니다.");
        }
        if (store.owner.id !== owner.id) {
            return res.status(401).send("가맹점 점주가 아닙니다.");
        }
        const schema = joi_1.default.object().keys({
            name: joi_1.default.string()
                .min(1)
                .max(30),
            description: joi_1.default.string(),
            address: joi_1.default.string(),
            detailAddress: joi_1.default.string(),
            category: joi_1.default.number(),
            webUrl: joi_1.default.string(),
            lat: joi_1.default.number(),
            lng: joi_1.default.number()
        });
        const validation = joi_1.default.validate(storeBody, schema);
        if (validation.error) {
            console.error(validation.error);
            return res.status(400).send("유효하지 않은 입력 값이 존재합니다.");
        }
        if (logoImg) {
            storeBody.logoImg = `/${logoImg.filename}`;
        }
        yield Store_1.default.update({ id: storeId }, Object.assign({}, storeBody));
        return res.send("업데이트에 성공하였습니다.");
    }
    catch (e) {
        return next(e);
    }
});
exports.remove = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // 관련 쿠폰/특가, 사업자 인증 모두 삭제 (나중에 구현)
    const owner = req.owner;
    const storeId = req.params.id;
    try {
        const store = yield Store_1.default.findOne({ id: storeId }, { relations: ["owner"] });
        if (!store) {
            return res.status(404).send("가맹점이 존재하지 않습니다.");
        }
        if (store.owner.id !== owner.id) {
            return res.status(401).send("가맹점 점주가 아닙니다.");
        }
        yield store.remove();
        return res.send("삭제에 성공하였습니다.");
    }
    catch (e) {
        return next(e);
    }
});
exports.listStoreAds = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const storeId = Number(req.params.storeId);
    const owner = req.owner;
    try {
        const store = yield Store_1.default.findOne({ id: storeId }, {
            relations: ["owner", "advertisement"]
        });
        if (!store) {
            return res.status(404).send("가맹점이 존재하지 않습니다.");
        }
        if (store.owner.id !== owner.id) {
            return res.status(401).send("가맹점 점주가 아닙니다.");
        }
        return res.json(store.advertisement);
    }
    catch (e) {
        console.error(e);
        return next(e);
    }
});
exports.registerBizRegImg = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const storeId = Number(req.params.storeId);
    const owner = req.owner;
    const bizRegImg = req.file;
    if (!bizRegImg) {
        return res.status(400).send("사업자 인증서 사진이 존재하지 않습니다.");
    }
    try {
        const store = yield Store_1.default.findOne({ id: storeId }, { relations: ["owner", "verificationStore"] });
        if (!store) {
            return res.status(404).send("가맹점이 존재하지 않습니다.");
        }
        const storeOWner = store.owner;
        if (owner.id !== storeOWner.id) {
            return res.status(401).send("가맹점의 점주가 아닙니다.");
        }
        if (!store.verificationStore) {
            return res
                .status(404)
                .send("가맹점 인증 정보가 만들어지지 않았습니다. 관리자에게 문의해주세요.");
        }
        store.verificationStore.bizRegImg = `/${bizRegImg.filename}`;
        store.verificationStore.status = "REQUESTING";
        store.verificationStore.save();
        return res.send("사업자 인증서 제출을 성공하였습니다.");
    }
    catch (e) {
        console.error(e);
        return next(e);
    }
});
exports.patchVerificationStore = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const { storeId } = req.params;
    const { status } = req.body;
    try {
        const store = yield Store_1.default.findOne({
            id: storeId
        }, { relations: ["verificationStore"] });
        if (!store) {
            return res.status(404).send("가맹점이 존재하지 않습니다.");
        }
        if (!store.verificationStore) {
            return res.status(404).send("인증한 적이 없는 가맹점입니다.");
        }
        store.verificationStore.status = status;
        store.verificationStore.save();
        return res.send("사업자 인증 상태 변경에 성공하였습니다.");
    }
    catch (e) {
        return next(e);
    }
});
//# sourceMappingURL=storesCtrl.js.map