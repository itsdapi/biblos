import { User } from "next-auth";

export enum Role {
  "封禁用户" = 0,
  "注册会员" = 1,
  "员工" = 2,
  "超级打工人" = 3,
}

export interface IUser extends User {
  role: Role;
  xp: number;
  user: User;
  balance: number;
}

export type TXpThresholds = number[];
export type TUserDiscountThresholds = number[];

export type Page<T> = {
  total: number;
  payload: T[];
};

export type TCart = {
  id: number;
  quantity: number;
  item?: TCartItem;
};

export type TCartItem = {
  coverUrl?: string;
  name: string;
  description?: string;
  price: number;
  discount: number;
};
