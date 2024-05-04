export const config = {
  db: {
    database: process.env.DB_DB_NAME,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    sid: process.env.DB_SID,
  },
  auth: {
    github: {
      id: process.env.AUTH_GITHUB_ID,
      secret: process.env.AUTH_GITHUB_SECRET,
    },
    gitee: {
      id: process.env.AUTH_GITEE_ID,
      secret: process.env.AUTH_GITEE_SECERT,
    },
    autho: {
      id: process.env.AUTH_AUTHO_ID,
      secret: process.env.AUTH_AUTHO_SECERT,
      issuer: process.env.AUTH_AUTHO_ISSUER,
    },
  },
  path: {
    ban: "/ban",
    addBook: "/dashboard/book/create",
    addPress: "/dashboard/press/create",
    addExpress: "/dashboard/express/create",
    editBook: "/dashboard/book/edit",
    editPress: "/dashboard/press/edit",
    editExpress: "/dashboard/express/edit",
    editUser: "/dashboard/user/edit",
    adminBook: "/dashboard/book",
    adminPress: "/dashboard/press",
    adminExpress: "/dashboard/express",
    adminUser: "/dashboard/user",
    adminPanel: "/dashboard",
    login: "/signin",
    bookDetail: "/book",
    cart: "/cart",
    checkoutSuccess: "/cart/result",
    order: "/profile/order",
    profile: "/profile",
  },
  route: {
    protected: ["/dashboard"],
  },
};
