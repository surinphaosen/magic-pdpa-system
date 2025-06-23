var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import "reflect-metadata";
import { NextResponse } from "next/server";
import { AppDataSource } from "@/lib/typeorm-data-source";
import { RopaRecord } from "@/lib/entity/RopaRecord";
export function GET(request_1, _a) {
    return __awaiter(this, arguments, void 0, function* (request, { params }) {
        var _b, _c;
        try {
            if (!AppDataSource.isInitialized) {
                yield AppDataSource.initialize();
            }
            const repo = AppDataSource.getRepository(RopaRecord);
            const record = yield repo.findOne({ where: { id: parseInt(params.id) } });
            if (!record) {
                return NextResponse.json({ error: "Record not found" }, { status: 404 });
            }
            // แปลงข้อมูลให้ตรงกับ format ที่ frontend ต้องการ (field name ให้เหมือน /api/ropa)
            const formattedRecord = {
                id: `ROPA-${record.id.toString().padStart(3, "0")}`,
                name: record.activityName, // เพิ่ม name ให้เหมือน /api/ropa
                activityName: record.activityName, // เผื่อใช้ชื่อเดิมในบางหน้า
                department: record.department,
                businessUnit: record.businessUnit || "",
                dataController: record.dataController || "",
                contactPerson: record.contactPerson || "",
                email: record.contactEmail || "",
                phone: record.contactPhone || "",
                lawfulBasis: record.lawfulBasis || "",
                description: "", // ไม่มีใน entity
                purpose: record.purposes || "",
                status: "Active",
                riskLevel: "Medium",
                lastUpdated: ((_b = record.updatedAt) === null || _b === void 0 ? void 0 : _b.toISOString().split("T")[0]) || "",
                createdDate: ((_c = record.createdAt) === null || _c === void 0 ? void 0 : _c.toISOString().split("T")[0]) || "",
                retentionPeriod: record.retentionPeriod || "",
                securityMeasures: record.securityMeasures || "",
                dataSubjects: (record.dataGroups || "").split(",").map(s => s.trim()).filter(Boolean),
                dataCategories: (record.customDataTypes || "").split(",").map(s => s.trim()).filter(Boolean),
                // ...other fields as needed...
            };
            return NextResponse.json(formattedRecord);
        }
        catch (error) {
            console.error("Error fetching RoPA record:", error);
            return NextResponse.json({ error: "Failed to fetch RoPA record" }, { status: 500 });
        }
    });
}
export function PUT(request_1, _a) {
    return __awaiter(this, arguments, void 0, function* (request, { params }) {
        try {
            if (!AppDataSource.isInitialized) {
                yield AppDataSource.initialize();
            }
            const repo = AppDataSource.getRepository(RopaRecord);
            const record = yield repo.findOne({ where: { id: parseInt(params.id) } });
            if (!record) {
                return NextResponse.json({ error: "Record not found" }, { status: 404 });
            }
            const body = yield request.json();
            // อัปเดต field ที่ต้องการ
            record.activityName = body.name || record.activityName;
            record.department = body.department || record.department;
            record.businessUnit = body.businessUnit || record.businessUnit;
            record.dataController = body.dataController || record.dataController;
            record.contactPerson = body.contactPerson || record.contactPerson;
            record.contactEmail = body.email || record.contactEmail;
            record.contactPhone = body.phone || record.contactPhone;
            record.lawfulBasis = body.lawfulBasis || record.lawfulBasis;
            record.purposes = body.purpose || record.purposes;
            // (description ไม่มีใน entity)
            yield repo.save(record);
            return NextResponse.json({ success: true });
        }
        catch (error) {
            console.error("Error updating RoPA record:", error);
            return NextResponse.json({ error: "Failed to update RoPA record" }, { status: 500 });
        }
    });
}
