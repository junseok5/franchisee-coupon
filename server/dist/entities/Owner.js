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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const class_validator_1 = require("class-validator");
const typeorm_1 = require("typeorm");
const bcrypt = __importStar(require("../utils/bcrypt"));
const Store_1 = __importDefault(require("./Store"));
let Owner = class Owner extends typeorm_1.BaseEntity {
    savePassword() {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.password) {
                const hashed = yield this.hashPassword(this.password);
                this.password = hashed;
            }
        });
    }
    comparePassword(password) {
        return bcrypt.compare(password, this.password);
    }
    hashPassword(password) {
        return bcrypt.hash(password);
    }
};
__decorate([
    typeorm_1.PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], Owner.prototype, "num", void 0);
__decorate([
    typeorm_1.Column({ type: "text" }),
    __metadata("design:type", String)
], Owner.prototype, "name", void 0);
__decorate([
    typeorm_1.PrimaryColumn({ type: "text" }),
    __metadata("design:type", String)
], Owner.prototype, "id", void 0);
__decorate([
    typeorm_1.Column({ type: "text" }),
    __metadata("design:type", String)
], Owner.prototype, "password", void 0);
__decorate([
    typeorm_1.Column({ type: "text" }),
    class_validator_1.IsEmail(),
    __metadata("design:type", String)
], Owner.prototype, "email", void 0);
__decorate([
    typeorm_1.OneToMany(type => Store_1.default, store => store.owner),
    __metadata("design:type", Array)
], Owner.prototype, "stores", void 0);
__decorate([
    typeorm_1.CreateDateColumn(),
    __metadata("design:type", String)
], Owner.prototype, "createdAt", void 0);
__decorate([
    typeorm_1.UpdateDateColumn(),
    __metadata("design:type", String)
], Owner.prototype, "updatedAt", void 0);
__decorate([
    typeorm_1.BeforeInsert(),
    typeorm_1.BeforeUpdate(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], Owner.prototype, "savePassword", null);
Owner = __decorate([
    typeorm_1.Entity()
], Owner);
exports.default = Owner;
//# sourceMappingURL=Owner.js.map