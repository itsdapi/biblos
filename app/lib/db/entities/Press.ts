import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "press" })
export class Press {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    comment: "出版社编号",
    length: 12,
    nullable: false,
  })
  pressNo!: string;

  @Column({
    length: 255,
    comment: "出版社名称",
    nullable: false,
  })
  pressName!: string;

  @Column({
    comment: "出版社地址",
    nullable: true,
  })
  address?: string;

  @Column({
    length: 6,
    comment: "邮政编码",
    nullable: true,
  })
  zipCode?: string;

  @Column({
    length: 12,
    comment: "联系人",
    nullable: true,
  })
  contactPerson?: string;

  @Column({
    length: 15,
    nullable: true,
    comment: "联系电话",
  })
  telephone?: string;

  @Column({
    length: 15,
    nullable: true,
    comment: "传真",
  })
  fax?: string;

  @Column({
    length: 20,
    nullable: true,
    comment: "电子邮箱",
  })
  email?: string;
}
