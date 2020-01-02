"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const constants_1 = require("../constants");
const Store_1 = __importDefault(require("./Store"));
const { SPECIAL, COUPON } = constants_1.adType;
let Advertisement = class Advertisement extends typeorm_1.BaseEntity {
    createCouponNum() {
        if (this.adType === COUPON) {
            this.couponNum = Math.floor(Math.random() * 100000000000).toString();
        }
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Advertisement.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ type: "text" }),
    __metadata("design:type", String)
], Advertisement.prototype, "title", void 0);
__decorate([
    typeorm_1.Column({ type: "text", nullable: true }),
    __metadata("design:type", String)
], Advertisement.prototype, "photo", void 0);
__decorate([
    typeorm_1.Column({ type: "text", nullable: true }),
    __metadata("design:type", String)
], Advertisement.prototype, "description", void 0);
__decorate([
    typeorm_1.Column({ type: "date" }),
    __metadata("design:type", String)
], Advertisement.prototype, "startAt", void 0);
__decorate([
    typeorm_1.Column({ type: "date" }),
    __metadata("design:type", String)
], Advertisement.prototype, "endAt", void 0);
__decorate([
    typeorm_1.Column({
        type: "boolean",
        default: false
    }),
    __metadata("design:type", Boolean)
], Advertisement.prototype, "isStopped", void 0);
__decorate([
    typeorm_1.Column({ type: "text", enum: [SPECIAL, COUPON] }),
    __metadata("design:type", String)
], Advertisement.prototype, "adType", void 0);
__decorate([
    typeorm_1.Column({ type: "int" }),
    __metadata("design:type", Number)
], Advertisement.prototype, "category", void 0);
__decorate([
    typeorm_1.Column({ type: "text", nullable: true }),
    __metadata("design:type", String)
], Advertisement.prototype, "couponNum", void 0);
__decorate([
    typeorm_1.Column({ type: "int", default: 0 }),
    __metadata("design:type", Number)
], Advertisement.prototype, "views", void 0);
__decorate([
    typeorm_1.Column({ type: "int", default: 0 }),
    __metadata("design:type", Number)
], Advertisement.prototype, "clickNum", void 0);
__decorate([
    typeorm_1.Column({ type: "int", default: 0 }),
    __metadata("design:type", Number)
], Advertisement.prototype, "downloadNum", void 0);
__decorate([
    typeorm_1.Column({ type: "int", default: 0 }),
    __metadata("design:type", Number)
], Advertisement.prototype, "usedCount", void 0);
__decorate([
    typeorm_1.Column({ type: "double precision", default: 0 }),
    __metadata("design:type", Number)
], Advertisement.prototype, "lat", void 0);
__decorate([
    typeorm_1.Column({ type: "double precision", default: 0 }),
    __metadata("design:type", Number)
], Advertisement.prototype, "lng", void 0);
__decorate([
    typeorm_1.ManyToOne(type => Store_1.default, store => store.advertisement),
    __metadata("design:type", Store_1.default)
], Advertisement.prototype, "store", void 0);
__decorate([
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", String)
], Advertisement.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.UpdateDateColumn(),
    __metadata("design:type", String)
], Advertisement.prototype, "updatedAt", void 0);
__decorate([
    typeorm_1.BeforeInsert(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], Advertisement.prototype, "createCouponNum", null);
Advertisement = __decorate([
    typeorm_1.Entity()
], Advertisement);
exports.default = Advertisement;
//# sourceMappingURL=Advertisement.js.map