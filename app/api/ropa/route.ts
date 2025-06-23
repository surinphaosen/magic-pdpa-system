import "reflect-metadata"
import { NextResponse } from "next/server"
import { AppDataSource } from "@/lib/typeorm-data-source"
import { RopaRecord } from "@/lib/entity/RopaRecord"

export async function GET() {
  try {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize()
    }
    const repo = AppDataSource.getRepository(RopaRecord)
    const records = await repo.find()
    
    // แปลงข้อมูลให้ตรงกับ format ที่ frontend ต้องการ
    const formattedRecords = records.map((record) => ({
      id: `ROPA-${record.id.toString().padStart(3, "0")}`,
      name: record.activityName,
      department: record.department,
      purpose: record.purposes || "",
      status: "Active", // หรือใส่ logic ตามที่ต้องการ
      riskLevel: "Medium", // หรือใส่ logic ตามที่ต้องการ
      lastUpdated: record.updatedAt?.toISOString().split("T")[0] || "",
      // เพิ่ม field อื่นๆ ตามที่ frontend ใช้
      businessUnit: record.businessUnit || "",
      dataController: record.dataController || "",
      contactPerson: record.contactPerson || "",
      email: record.contactEmail || "",
      phone: record.contactPhone || "",
      lawfulBasis: record.lawfulBasis || "",
      retentionPeriod: record.retentionPeriod || "",
      securityMeasures: record.securityMeasures || "",
      dataSubjects: (record.dataGroups || "").split(",").map(s => s.trim()).filter(Boolean),
      dataCategories: (record.customDataTypes || "").split(",").map(s => s.trim()).filter(Boolean),
    }))

    return NextResponse.json(formattedRecords)
  } catch (error) {
    console.error("Error fetching RoPA records:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
