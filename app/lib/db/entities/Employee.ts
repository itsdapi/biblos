import { Entity, PrimaryColumn, Column, Check } from "typeorm";

@Entity()
export class Employee {
  @PrimaryColumn({
    type: "char",
    length: 10,
    comment: "职员编号",
  })
  @Check(`"employeeNo" LIKE '[E-F]999999999'`) // Adjusted for Oracle compatibility
  employeeNo!: string;

  @Column({
    type: "varchar2",
    length: 10,
    nullable: false,
    comment: "登陆密码",
  })
  empPassword!: string;

  @Column({
    type: "varchar2",
    length: 20,
    nullable: false,
    comment: "员工姓名",
  })
  empName!: string;

  @Column({
    type: "char",
    length: 2,
    nullable: true,
    comment: "员工性别, 在‘男’和‘女’中取值",
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
    length: 30,
    nullable: true,
    comment: "所属部门",
  })
  department!: string;

  @Column({
    type: "varchar2",
    length: 20,
    nullable: true,
    comment: "职务",
  })
  title!: string;

  @Column({
    type: "number",
    nullable: true,
    comment: "薪水",
  })
  salary!: number;

  @Column({
    type: "varchar2",
    length: 40,
    nullable: true,
    comment: "员工住址",
  })
  address!: string;

  @Column({
    type: "varchar2",
    length: 15,
    nullable: true,
    comment: "员工电话",
  })
  telephone!: string;

  @Column({
    type: "varchar2",
    length: 20,
    nullable: true,
    comment: "员工邮箱",
  })
  email!: string;
}
