import { User } from "next-auth";

export enum Role {
  // 封禁用户
  'banned' = '0',

  // 普通会员
  'user' = '1',

  // 员工
  'employee' = '2',

  // 系统管理员
  'admin' = '3',
}

export interface IUser extends User {
  role: Role;
}
