import { DataSource } from "typeorm";
import { RopaRecord } from "./entity/RopaRecord";
import { MasterData } from "./entity/MasterData";

export const AppDataSource = new DataSource({
  type: "mssql",
  host: "MSSQLDB01",
  port: 1433,
  username: "sa",
  password: "Passw0rd",
  database: "mstpdpa",
  synchronize: true, // สำหรับ dev เท่านั้น
  entities: [RopaRecord, MasterData],
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
});
