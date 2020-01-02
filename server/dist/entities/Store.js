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
const Advertisement_1 = __importDefault(require("./Advertisement"));
const Owner_1 = __importDefault(require("./Owner"));
const VerificationStore_1 = __importDefault(require("./VerificationStore"));
let Store = class Store extends typeorm_1.BaseEntity {
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Store.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ type: "text" }),
    __metadata("design:type", String)
], Store.prototype, "name", void 0);
__decorate([
    typeorm_1.Column({ type: "text" }),
    __metadata("design:type", String)
], Store.prototype, "description", void 0);
__decorate([
    typeorm_1.Column({ type: "text" }),
    __metadata("design:type", String)
], Store.prototype, "address", void 0);
__decorate([
    typeorm_1.Column({ type: "text" }),
    __metadata("design:type", String)
], Store.prototype, "detailAddress", void 0);
__decorate([
    typeorm_1.Column({ type: "int" }),
    __metadata("design:type", Number)
], Store.prototype, "category", void 0);
__decorate([
    typeorm_1.Column({ type: "text", nullable: true }),
    __metadata("design:type", String)
], Store.prototype, "webUrl", void 0);
__decorate([
    typeorm_1.Column({ type: "text", default: "/img/default_store_logo.png" }),
    __metadata("design:type", String)
], Store.prototype, "logoImg", void 0);
__decorate([
    typeorm_1.Column({ type: "double precision", default: 0 }),
    __metadata("design:type", Number)
], Store.prototype, "lat", void 0);
__decorate([
    typeorm_1.Column({ type: "double precision", default: 0 }),
    __metadata("design:type", Number)
], Store.prototype, "lng", void 0);
__decorate([
    typeorm_1.ManyToOne(type => Owner_1.default, owner => owner.stores),
    __metadata("design:type", Owner_1.default)
], Store.prototype, "owner", void 0);
__decorate([
    typeorm_1.OneToOne(type => VerificationStore_1.default),
    typeorm_1.JoinColumn(),
    __metadata("design:type", VerificationStore_1.default)
], Store.prototype, "verificationStore", void 0);
__decorate([
    typeorm_1.OneToMany(type => Advertisement_1.default, advertisment => advertisment.store),
    __metadata("design:type", Advertisement_1.default)
], Store.prototype, "advertisement", void 0);
__decorate([
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", String)
], Store.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.UpdateDateColumn(),
    __metadata("design:type", String)
], Store.prototype, "updatedAt", void 0);
Store = __decorate([
    typeorm_1.Entity()
], Store);
exports.default = Store;
//# sourceMappingURL=Store.js.map