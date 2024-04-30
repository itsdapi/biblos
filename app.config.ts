export const config = {
  db: {
    database: "bookstore",
    host: "192.168.100.121",
    port: 1521,
    username: "c##bookstoreapp",
    password: "abc1234567",
    sid: "bookstore",
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
    adminBook: "/dashboard/book",
    adminPress: "/dashboard/press",
    adminExpress: "/dashboard/express",
    adminPanel: "/dashboard",
    login: "/signin",
    bookDetail: "/book",
    cart: "/cart",
    checkoutSuccess: "/cart/result",
    order: "/profile/order",
  },
  route: {
    protected: ["/dashboard"],
  },
};
