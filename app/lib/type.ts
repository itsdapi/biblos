import { User } from "next-auth";

export enum Role {
  "封禁用户",
  "注册会员",
  "员工",
  "超级打工人",
}

export interface IUser extends User {
  role: Role;
  xp: number;
  user: User;
}

export type TXpThresholds = number[];
