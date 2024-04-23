import "reflect-metadata";
import { DataSource } from "typeorm";
import { Book } from "@/app/lib/db/models/book";
import { config } from "@/app.config";

const oracleConnection = new DataSource({
  database: config.db.database,
  synchronize: true,
  logging: true,
  migrations: [],
  subscribers: [],
  type: "oracle",
  host: config.db.host,
  port: config.db.port,
  username: config.db.username,
  password: config.db.password,
  sid: config.db.sid,
  entities: [Book],
  extra: {
    // Depending on your Oracle client configuration, you might need additional options
  },
});

export const getDBConnection = async (): Promise<DataSource> => {
  if (!oracleConnection.isInitialized) {
    await oracleConnection.initialize();
  }
  return oracleConnection;
};
