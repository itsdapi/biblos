# Biblos 在线书店

> 使用 `Next.js`, `TypeORM`, `NextAuth`, `Oracle DB` 开发的在线书店网页

这是我们小组的一个课程期末作业，如果当然大家想拿来学习的就直接用hhh，都可以的。

这个是[demo](https://book.itsp3.space) (不一定在线)

项目用的是Oracle数据库作为后端，如果需要改成其他数据库的话需要改动 `/app/lib/db/connection.ts` 文件中的配置，
可能还得动一下 `/app/lib/db/Entities` 下面的数据库模型，里面用到了 `VARCHAR2` 其他数据库不一定可以

前端用的是 `Nextjs`, `Typescript`, `tailwindcss` 全家桶，与数据库链接用的是 `TypeORM`，
验证用的是 `NextAuth` 并且使用 `TypeORM-Adaptor`
链接数据库持久化保存用户数据，本项目用的是 `Github`, `Gitee`, `Authentik(自建)`
方式进行用户注册与登录，可以根据自己需求修改使用其他方式登陆验证（懒的自己写本地登陆注册orz）

UI组件用的是 `Ant Degisn` 与 `NextUI`

## 如何部署

需要准备一个在线的 `Oracle` 数据库，并且创建好专门给本应用的数据库，以及一个有基本权限的帐户

复制一份 `.env.template` 文件，填写里面的各种OAuth提供方的ID和Secret，不需要的话也可以不填

| key                | 值                        |
|--------------------|--------------------------|
| AUTH_SECRET        | 需要自己生成，参考下文              |
| AUTH_GITHUB_ID     | GitHub OAuth ID          |
| AUTH_GITHUB_SECRET | GitHub OAuth 密钥          |
| AUTH_GITEE_ID      | Gitee OAuth ID           |
| AUTH_GITEE_SECERT  | Gitee OAuth 密钥           |
| AUTH_AUTHO_ID      | Authentik OAuth ID       | 
| AUTH_AUTHO_SECERT  | Authentik OAuth 密钥       |
| AUTH_AUTHO_ISSUER  | Authentik OAuth Issuer地址 |
| AUTH_TRUST_HOST    | 需设置为true                 |
| DB_DB_NAME         | 数据库名称                    |
| DB_HOST            | 数据库链接地址                  |
| DB_PORT            | 数据库端口                    |
| DB_USERNAME        | 数据库用户名                   |
| DB_PASSWORD        | 数据库密码                    |
| DB_SID             | Oracle数据库SID             |

将填写好的环境变量文件改名成 `.env.local`

### 生成 `AUTH_SECRET`
```shell
openssl rand -base64 32
```

### 使用Docker部署
确保自己的 `.env.local` 文件已经创建好

```shell
docker compose up -d --build
```

如果是老版本docker需要使用

```shell
docker-compose up -d --build
```

默认端口 `3002`，需要修改的话在 `docker-compose.yml` 中修改

### 直接运行

安装依赖
```shell
npm i
```

构建
```shell
npm run build
```

运行
```shell
npm run standalone
```

如果需要开发
```shell
npm run dev
```
