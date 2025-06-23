import "reflect-metadata";
import { NextRequest, NextResponse } from "next/server";
import { AppDataSource } from "@/lib/typeorm-data-source";
import { RopaRecord } from "@/lib/entity/RopaRecord";

export async function POST(req: NextRequest) {
  try {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }
    const data = await req.json();
    const repo = AppDataSource.getRepository(RopaRecord);
    const record = repo.create(data);
    await repo.save(record);
    return NextResponse.json({ success: true, record });
  } catch (error) {
    return NextResponse.json({ success: false, error: error?.toString() });
  }
}
