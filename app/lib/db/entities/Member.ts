import { Entity, PrimaryColumn, Column, Check } from "typeorm";

@Entity()
export class Member {
  @PrimaryColumn({
    type: "char",
    length: 10,
    comment: "会员编号",
  })
  @Check(`"memberNo" LIKE '[M-Z]999999999'`)
  memberNo!: string;

  @Column({
    type: "varchar2",
    length: 10,
    nullable: false,
    comment: "登陆密码",
  })
  memPassword!: string;

  @Column({
    type: "varchar2",
    length: 20,
    nullable: false,
    comment: "会员姓名",
  })
  memName!: string;

  @Column({
    type: "char",
    length: 2,
    nullable: true,
    comment: "会员性别",
  })
  sex!: string;

  @Column({
    type: "timestamp",
    nullable: true,
    comment: "出生日期",
  })
  birthday!: Date;

  @Column({
    type: "varchar2",
    length: 15,
    nullable: false,
    comment: "会员电话",
  })
  telephone!: string;

  @Column({
    type: "varchar2",
    length: 20,
    nullable: true,
    comment: "会员邮箱",
  })
  email!: string;

  @Column({
    type: "varchar2",
    length: 40,
    nullable: false,
    comment: "会员住址",
  })
  address!: string;

  @Column({
    type: "char",
    length: 6,
    nullable: false,
    comment: "邮政编码",
  })
  zipCode!: string;

  @Column({
    type: "varchar2",
    length: 20,
    nullable: false,
    comment: "单位",
  })
  unit!: string;

  @Column({
    type: "number",
    nullable: true,
    comment: "购书总额",
  })
  totalAmount!: number;

  @Column({
    type: "char",
    length: 1,
    nullable: false,
    comment: "VIP等级",
  })
  memLevel!: string;
}
