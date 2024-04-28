import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Express {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    comment: "快递公司编号",
    nullable: false,
  })
  expressNo!: string;

  @Column({
    comment: "快递公司名称",
    nullable: false,
  })
  expressName!: string;

  @Column({
    comment: "快递公司地址",
    nullable: true,
  })
  address!: string;

  @Column({
    comment: "邮政编码",
    nullable: true,
  })
  zipCode!: number;

  @Column({
    comment: "联系人",
    nullable: true,
  })
  contactPerson!: string;

  @Column({
    comment: "联系电话",
    nullable: true,
  })
  telephone!: string;

  @Column({
    comment: "传真",
    nullable: true,
  })
  fax!: string;

  @Column({
    comment: "邮箱",
    nullable: true,
  })
  email!: string;
}
