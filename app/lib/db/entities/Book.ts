import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Press } from "./Press";

@Entity()
export class Book {
  @PrimaryColumn({
    type: "char",
    length: 17,
    comment: "书号",
  })
  ISBN!: string;

  @Column({
    type: "varchar2",
    length: 30,
    nullable: false,
    comment: "书名",
  })
  bookTitle!: string;

  @Column({
    type: "varchar2",
    length: 40,
    nullable: false,
    comment: "作者",
  })
  author!: string;

  @Column({
    type: "timestamp",
    nullable: true,
    comment: "出版日期",
  })
  publishDate!: Date;

  @Column({
    type: "int",
    nullable: true,
    comment: "版次",
  })
  version!: number;

  @Column({
    type: "varchar2",
    length: 20,
    nullable: true,
    comment: "类别",
  })
  category!: string;

  @Column({
    type: "int",
    nullable: true,
    comment: "库存数量",
  })
  stockNumber!: number;

  @Column({
    type: "number",
    nullable: false,
    comment: "定价",
  })
  price!: number;

  @Column({
    type: "float",
    nullable: true,
    comment: "图书折扣",
  })
  bookDiscount?: number;

  @Column({
    type: "varchar2",
    length: 500,
    nullable: true,
    comment: "内容简介",
  })
  introduction?: string;

  @Column({
    type: "varchar2",
    length: 500,
    nullable: true,
    comment: "目录",
  })
  catalog?: string;

  @ManyToOne(() => Press)
  @JoinColumn({ name: "pressNo" })
  press?: Press;
}
