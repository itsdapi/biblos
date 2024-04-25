import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity()
export class Company {
  @PrimaryColumn({
    type: "char",
    length: 12,
    comment: "公司编号",
  })
  companyNo!: string;

  @Column({
    type: "varchar2",
    length: 20,
    nullable: false,
    comment: "公司名称",
  })
  companyName!: string;

  @Column({
    type: "varchar2",
    length: 40,
    nullable: false,
    comment: "公司地址",
  })
  address!: string;

  @Column({
    type: "char",
    length: 6,
    nullable: true,
    comment: "邮政编码",
  })
  zipCode!: string;

  @Column({
    type: "varchar2",
    length: 12,
    nullable: true,
    comment: "联系人",
  })
  contactPerson!: string;

  @Column({
    type: "varchar2",
    length: 15,
    nullable: true,
    comment: "联系电话",
  })
  telephone!: string;

  @Column({
    type: "varchar2",
    length: 20,
    nullable: true,
    comment: "传真",
  })
  fax!: string;

  @Column({
    type: "varchar2",
    length: 20,
    nullable: true,
    comment: "电子邮箱",
  })
  email!: string;
}
