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
import { MasterData } from "@/lib/entity/MasterData";
// GET /api/master-data?category=businessUnits
export function GET(request) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { searchParams } = new URL(request.url);
            const category = searchParams.get("category");
            if (!AppDataSource.isInitialized) {
                yield AppDataSource.initialize();
            }
            const repo = AppDataSource.getRepository(MasterData);
            const where = category ? { category } : {};
            const data = yield repo.find({ where });
            return NextResponse.json(data);
        }
        catch (error) {
            console.error("Error fetching master data:", error);
            return NextResponse.json({ error: "Failed to fetch master data" }, { status: 500 });
        }
    });
}
// POST /api/master-data
export function POST(request) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const body = yield request.json();
            if (!AppDataSource.isInitialized) {
                yield AppDataSource.initialize();
            }
            const repo = AppDataSource.getRepository(MasterData);
            const item = repo.create(body);
            const saved = yield repo.save(item);
            return NextResponse.json(saved);
        }
        catch (error) {
            console.error("Error creating master data:", error);
            return NextResponse.json({ error: "Failed to create master data" }, { status: 500 });
        }
    });
}
