import "reflect-metadata";
import { NextResponse } from "next/server";
import { AppDataSource } from "@/lib/typeorm-data-source";
import { MasterData } from "@/lib/entity/MasterData";

// GET /api/master-data?category=businessUnits
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }
    const repo = AppDataSource.getRepository(MasterData);
    const where = category ? { category } : {};
    const data = await repo.find({ where });
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching master data:", error);
    return NextResponse.json({ error: "Failed to fetch master data" }, { status: 500 });
  }
}

// POST /api/master-data
export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }
    const repo = AppDataSource.getRepository(MasterData);
    const item = repo.create(body);
    const saved = await repo.save(item);
    return NextResponse.json(saved);
  } catch (error) {
    console.error("Error creating master data:", error);
    return NextResponse.json({ error: "Failed to create master data" }, { status: 500 });
  }
}
