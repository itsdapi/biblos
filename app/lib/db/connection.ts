import "reflect-metadata";
import "server-only";
import { DataSource, DataSourceOptions } from "typeorm";
import { Book } from "@/app/lib/db/entities/Book";
import { config } from "@/app.config";
import { Press } from "@/app/lib/db/entities/Press";
import * as userEntities from "@/app/lib/db/entities/User";
import { Setting } from "@/app/lib/db/entities/Setting";
import { Express } from "@/app/lib/db/entities/Express";
import { Order, OrderItem } from "@/app/lib/db/entities/Order";
import { unstable_noStore as noStore } from "next/cache";

const dbOption: DataSourceOptions = {
  database: config.db.database,
  synchronize: true,
  logging: false,
  migrations: [],
  subscribers: [],
  type: "oracle",
  host: config.db.host,
  port: Number(config.db.port),
  username: config.db.username,
  password: config.db.password,
  sid: config.db.sid,
  entities: [
    Book,
    Press,
    Setting,
    Express,
    Order,
    OrderItem,
    userEntities.UserEntity,
    userEntities.AccountEntity,
    userEntities.VerificationTokenEntity,
    userEntities.SessionEntity,
  ],
};

const oracleConnection = new DataSource(dbOption);

export const getDBConnection = async (): Promise<DataSource> => {
  noStore();
  if (!oracleConnection.isInitialized) {
    await oracleConnection.initialize();
  }
  return oracleConnection;
};
