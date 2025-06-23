var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";
let RopaRecord = class RopaRecord {
};
__decorate([
    PrimaryGeneratedColumn(),
    __metadata("design:type", Number)
], RopaRecord.prototype, "id", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], RopaRecord.prototype, "activityName", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], RopaRecord.prototype, "department", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], RopaRecord.prototype, "businessUnit", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], RopaRecord.prototype, "dataController", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], RopaRecord.prototype, "contactPerson", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], RopaRecord.prototype, "contactEmail", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], RopaRecord.prototype, "contactPhone", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], RopaRecord.prototype, "dpoName", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], RopaRecord.prototype, "dpoEmail", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], RopaRecord.prototype, "dpoPhone", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], RopaRecord.prototype, "dataGroups", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], RopaRecord.prototype, "customDataTypes", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], RopaRecord.prototype, "relatedAssets", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], RopaRecord.prototype, "purposes", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], RopaRecord.prototype, "customPurpose", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], RopaRecord.prototype, "lawfulBasis", void 0);
__decorate([
    Column(),
    __metadata("design:type", String)
], RopaRecord.prototype, "retentionPeriod", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], RopaRecord.prototype, "retentionCriteria", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], RopaRecord.prototype, "disposalMethod", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], RopaRecord.prototype, "accessRights", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], RopaRecord.prototype, "accessConditions", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], RopaRecord.prototype, "accessPersons", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], RopaRecord.prototype, "disclosureExemptions", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], RopaRecord.prototype, "customDisclosure", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], RopaRecord.prototype, "securityMeasures", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], RopaRecord.prototype, "customSecurity", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], RopaRecord.prototype, "rejectionCases", void 0);
__decorate([
    Column({ nullable: true }),
    __metadata("design:type", String)
], RopaRecord.prototype, "objectionCases", void 0);
__decorate([
    CreateDateColumn(),
    __metadata("design:type", Date)
], RopaRecord.prototype, "createdAt", void 0);
__decorate([
    UpdateDateColumn(),
    __metadata("design:type", Date)
], RopaRecord.prototype, "updatedAt", void 0);
RopaRecord = __decorate([
    Entity()
], RopaRecord);
export { RopaRecord };
