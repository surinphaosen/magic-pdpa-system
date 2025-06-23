import "reflect-metadata"
import { NextResponse } from "next/server"
import { AppDataSource } from "@/lib/typeorm-data-source"
import { RopaRecord } from "@/lib/entity/RopaRecord"

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize()
    }
    const idParam = params.id
    // ดึง id จริงจาก format ROPA-001
    const id =
      typeof idParam === "string" && idParam.startsWith("ROPA-")
        ? parseInt(idParam.replace("ROPA-", ""), 10)
        : parseInt(idParam, 10)
    if (!id || isNaN(id))
      return NextResponse.json({ error: "Invalid ID" }, { status: 400 })
    const repo = AppDataSource.getRepository(RopaRecord)
    const record = await repo.findOneBy({ id })
    if (!record)
      return NextResponse.json({ error: "Not found" }, { status: 404 })

    // mapping field ให้ตรงกับ frontend
    const data = {
      id: `ROPA-${record.id.toString().padStart(3, "0")}`,
      name: record.activityName,
      department: record.department,
      businessUnit: record.businessUnit || "",
      dataController: record.dataController || "",
      contactPerson: record.contactPerson || "",
      email: record.contactEmail || "",
      phone: record.contactPhone || "",
      lawfulBasis: record.lawfulBasis || "",
      description: record.description || "",
      purpose: record.purposes || "",
      status: "Active",
      riskLevel: "Medium",
      lastUpdated: record.updatedAt?.toISOString().split("T")[0] || "",
      createdDate: record.createdAt?.toISOString().split("T")[0] || "",
      retentionPeriod: record.retentionPeriod || "",
      securityMeasures: record.securityMeasures || "",
      dataSubjects: (record.dataGroups || "")
        .split(",")
        .map(s => s.trim())
        .filter(Boolean),
      dataCategories: (record.customDataTypes || "")
        .split(",")
        .map(s => s.trim())
        .filter(Boolean),
      processors: record.processors || "",
      dataTransfer: record.dataTransfer || "",
    }
    return NextResponse.json(data)
  } catch (error) {
    console.error("Error fetching RoPA record by id:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize()
    }
    const repo = AppDataSource.getRepository(RopaRecord)
    const record = await repo.findOne({ where: { id: parseInt(params.id) } })
    if (!record) {
      return NextResponse.json({ error: "Record not found" }, { status: 404 })
    }
    const body = await request.json()
    // อัปเดต field ที่ต้องการ
    record.activityName = body.name || record.activityName
    record.department = body.department || record.department
    record.businessUnit = body.businessUnit || record.businessUnit
    record.dataController = body.dataController || record.dataController
    record.contactPerson = body.contactPerson || record.contactPerson
    record.contactEmail = body.email || record.contactEmail
    record.contactPhone = body.phone || record.contactPhone
    record.lawfulBasis = body.lawfulBasis || record.lawfulBasis
    record.purposes = body.purpose || record.purposes
    // (description ไม่มีใน entity)
    await repo.save(record)
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error updating RoPA record:", error)
    return NextResponse.json({ error: "Failed to update RoPA record" }, { status: 500 })
  }
}
