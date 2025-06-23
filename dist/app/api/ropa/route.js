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
export function GET() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            if (!AppDataSource.isInitialized) {
                yield AppDataSource.initialize();
            }
            const repo = AppDataSource.getRepository(RopaRecord);
            const records = yield repo.find();
            // แปลงข้อมูลให้ตรงกับ format ที่ frontend ต้องการ
            const formattedRecords = records.map((record, idx) => {
                var _a, _b;
                return ({
                    id: `ROPA-${record.id.toString().padStart(3, "0")}`,
                    name: record.activityName,
                    department: record.department,
                    businessUnit: record.businessUnit || "",
                    dataController: record.dataController || "",
                    contactPerson: record.contactPerson || "",
                    email: record.contactEmail || "",
                    phone: record.contactPhone || "",
                    lawfulBasis: record.lawfulBasis || "",
                    // ไม่มี description ใน entity, ส่ง "" ไปก่อน
                    description: "",
                    purpose: record.purposes || "",
                    status: "Active", // หรือใส่ logic ตามที่ต้องการ
                    riskLevel: "Medium", // หรือใส่ logic ตามที่ต้องการ
                    lastUpdated: ((_a = record.updatedAt) === null || _a === void 0 ? void 0 : _a.toISOString().split("T")[0]) || "",
                    createdDate: ((_b = record.createdAt) === null || _b === void 0 ? void 0 : _b.toISOString().split("T")[0]) || "",
                    retentionPeriod: record.retentionPeriod || "",
                    securityMeasures: record.securityMeasures || "",
                    dataSubjects: (record.dataGroups || "").split(",").map(s => s.trim()).filter(Boolean),
                    dataCategories: (record.customDataTypes || "").split(",").map(s => s.trim()).filter(Boolean),
                });
            });
            return NextResponse.json(formattedRecords);
        }
        catch (error) {
            console.error("Error fetching RoPA records:", error);
            return NextResponse.json({ error: "Failed to fetch RoPA records" }, { status: 500 });
        }
    });
}
