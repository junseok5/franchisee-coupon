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
const typeorm_1 = require("typeorm");
const Advertisement_1 = __importDefault(require("../../../entities/Advertisement"));
const Store_1 = __importDefault(require("../../../entities/Store"));
exports.read = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    try {
        const advertisement = yield Advertisement_1.default.findOne({ id });
        if (!advertisement) {
            return res.status(404).send("광고가 존재하지 않습니다.");
        }
        return res.json(advertisement);
    }
    catch (e) {
        console.error(e);
        return next(e);
    }
});
exports.list = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const category = req.query.category ? Number(req.query.category) : undefined;
    let lat = Number(req.query.lat);
    let lng = Number(req.query.lng);
    const radius = Number(req.query.radius);
    const storeId = req.query.storeId;
    let latRadius;
    let lngRadius;
    if (radius) {
        latRadius = radius * 0.0000075;
        lngRadius = radius * 0.000009;
    }
    try {
        if (storeId) {
            const store = yield Store_1.default.findOne({ id: storeId });
            if (store) {
                lat = store.lat;
                lng = store.lng;
            }
        }
        let query;
        query =
            category !== undefined
                ? {
                    category
                }
                : {};
        query = radius
            ? Object.assign(Object.assign({}, query), { lat: typeorm_1.Between(lat - latRadius, lat + latRadius), lng: typeorm_1.Between(lng - lngRadius, lng + lngRadius) }) : Object.assign({}, query);
        let now = new Date().toISOString().split("T")[0];
        now = `${now}T00:00:00`;
        query = Object.assign(Object.assign({}, query), { startAt: typeorm_1.LessThan(now), endAt: typeorm_1.MoreThan(now), isStopped: false });
        console.log(query);
        const advertisements = yield typeorm_1.getRepository(Advertisement_1.default).find(query);
        return res.json(advertisements);
    }
    catch (e) {
        console.error(e);
        return next(e);
    }
});
exports.write = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const ad = req.body;
    const photo = req.file;
    const storeId = req.params.id;
    const owner = req.owner;
    try {
        const store = yield Store_1.default.findOne({ id: storeId }, { relations: ["owner", "verificationStore"] });
        if (!store) {
            return res.status(404).send("가맹점이 존재하지 않습니다.");
        }
        if (store.owner.id !== owner.id) {
            return res.status(401).send("해당 가맹점의 점주 계정이 아닙니다.");
        }
        if (!store.verificationStore) {
            return res.status(404).send("가맹점 인증 정보가 존재하지 않습니다.");
        }
        if (store.verificationStore.status !== "ACCEPTED") {
            return res.status(401).json("사업자 인증을 먼저 진행해주세요.");
        }
        const schema = joi_1.default.object().keys({
            title: joi_1.default.string().required(),
            description: joi_1.default.string(),
            startAt: joi_1.default.date().required(),
            endAt: joi_1.default.date().required(),
            adType: joi_1.default.string().required()
        });
        const validation = joi_1.default.validate(ad, schema);
        if (validation.error) {
            console.error(validation.error);
            return res.status(400).send("유효하지 않은 입력 값이 존재합니다.");
        }
        if (photo) {
            ad.photo = `/${photo.filename}`;
        }
        const savedAdvertisement = yield Advertisement_1.default.create(Object.assign(Object.assign({}, ad), { category: store.category, lat: store.lat, lng: store.lng, store })).save();
        return res.json(savedAdvertisement);
    }
    catch (e) {
        console.error(e);
        return next(e);
    }
});
exports.update = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const owner = req.owner;
    const photo = req.file;
    try {
        const advertisement = yield Advertisement_1.default.findOne({ id }, { relations: ["store", "store.owner"] });
        if (!advertisement) {
            return res.status(404).json("해당 id의 광고가 존재하지 않습니다.");
        }
        if (!advertisement.store) {
            return res
                .status(404)
                .send("광고를 등록한 가맹점 정보가 존재하지 않습니다.");
        }
        if (advertisement.store.owner.id !== owner.id) {
            return res.status(401).send("광고를 등록한 점주가 아닙니다.");
        }
        const schema = joi_1.default.object().keys({
            title: joi_1.default.string(),
            description: joi_1.default.string(),
            startAt: joi_1.default.date(),
            endAt: joi_1.default.date(),
            adType: joi_1.default.string(),
            isStopped: joi_1.default.boolean()
        });
        const validation = joi_1.default.validate(req.body, schema);
        if (validation.error) {
            return res.status(400).send("유효하지 않은 입력 값이 존재합니다.");
        }
        if (photo) {
            req.body.photo = `/${photo.filename}`;
        }
        yield Advertisement_1.default.update({ id }, Object.assign({}, req.body));
        return res.send("업데이트에 성공하였습니다.");
    }
    catch (e) {
        return next(e);
    }
});
exports.remove = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const owner = req.owner;
    const id = req.params.id;
    try {
        const advertisement = yield Advertisement_1.default.findOne({ id }, { relations: ["store", "store.owner"] });
        if (!advertisement) {
            return res.status(404).send("해당 id의 광고가 존재하지 않습니다.");
        }
        if (!advertisement.store) {
            return res
                .status(404)
                .send("광고를 등록한 가맹점이 존재하지 않습니다.");
        }
        if (advertisement.store.owner.id !== owner.id) {
            return res.status(401).send("광고를 등록한 점주가 아닙니다.");
        }
        yield advertisement.remove();
        return res.send("삭제에 성공하였습니다.");
    }
    catch (e) {
        return next(e);
    }
});
//# sourceMappingURL=adsCtrl.js.map