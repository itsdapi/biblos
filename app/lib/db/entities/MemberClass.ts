import { Entity, PrimaryColumn, Column } from "typeorm";

@Entity()
export class MemberClass {
  @PrimaryColumn({
    type: "char",
    length: 1,
    comment: "VIP等级",
  })
  memLevel!: string;

  @Column({
    type: "number",
    nullable: false,
    comment: "等级购书额定",
  })
  levelSum!: number;

  @Column({
    type: "float",
    nullable: false,
    comment: "享受折扣",
  })
  memDiscount!: number;
}
