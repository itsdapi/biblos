import "reflect-metadata";
import { DataSource, DataSourceOptions } from "typeorm";
import { Book } from "@/app/lib/db/entities/Book";
import { config } from "@/app.config";
import { Press } from "@/app/lib/db/entities/Press";
import * as userEntities from "@/app/lib/db/entities/User";

const dbOption: DataSourceOptions = {
  database: config.db.database,
  synchronize: true,
  logging: false,
  migrations: [],
  subscribers: [],
  type: "oracle",
  host: config.db.host,
  port: config.db.port,
  username: config.db.username,
  password: config.db.password,
  sid: config.db.sid,
  entities: [Book, Press, userEntities.UserEntity, userEntities.AccountEntity, userEntities.VerificationTokenEntity, userEntities.SessionEntity],
};

const oracleConnection = new DataSource(dbOption);

export const getDBConnection = async (): Promise<DataSource> => {
  if (!oracleConnection.isInitialized) {
    await oracleConnection.initialize();
  }
  return oracleConnection;
};
