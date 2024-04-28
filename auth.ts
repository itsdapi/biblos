import "server-only";

import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import AuthentikProvider from "next-auth/providers/authentik";
import { TypeORMAdapter } from "@auth/typeorm-adapter";
import * as entities from "@/app/lib/db/entities/User";
import { config } from "@/app.config";
import Gitee from "@/app/lib/provider/gitee";
import { Provider } from "@auth/core/providers";
import { DataSourceOptions } from "typeorm";

const authDbOption: DataSourceOptions = {
  database: config.db.database,
  synchronize: true,
  logging: false,
  type: "oracle",
  host: config.db.host,
  port: config.db.port,
  username: config.db.username,
  password: config.db.password,
  sid: config.db.sid,
};

const providers: Provider[] = [
  GitHubProvider({
    clientId: config.auth.github.id,
    clientSecret: config.auth.github.secret,
  }),
  Gitee({
    clientId: config.auth.gitee.id,
    clientSecret: config.auth.gitee.secret,
  }),
  AuthentikProvider({
    clientId: config.auth.autho.id,
    clientSecret: config.auth.autho.secret,
    issuer: config.auth.autho.issuer,
    profile(profile) {
      return {
        ...profile,
        id: profile.sub,
        name: profile.nickname,
      };
    },
  }),
];

export const providerMap = providers.map((provider) => {
  if (typeof provider === "function") {
    return provider();
  } else {
    return { ...provider };
  }
});

export const { signIn, signOut, auth, handlers } = NextAuth({
  adapter: TypeORMAdapter(authDbOption, { entities }),
  providers,
  pages: {
    signIn: config.path.login,
  },
});
