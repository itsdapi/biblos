import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Press } from "./Press";

@Entity()
export class Book {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    length: 17,
    comment: "书号",
    nullable: false,
  })
  ISBN!: string;

  @Column({
    length: 255,
    comment: "书名",
    nullable: false,
  })
  bookTitle!: string;

  @Column({
    length: 40,
    nullable: true,
    comment: "作者",
  })
  author?: string;

  @Column({
    nullable: true,
    comment: "出版日期",
  })
  publishDate?: Date;

  @Column({
    nullable: true,
    comment: "版次",
  })
  version?: number;

  @Column({
    length: 20,
    nullable: true,
    comment: "类别",
  })
  category?: string;

  @Column({
    nullable: false,
    comment: "库存数量",
  })
  stockNumber!: number;

  @Column({
    type: "float",
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
    length: 1000,
    nullable: true,
    comment: "内容简介",
  })
  introduction?: string;

  @Column({
    length: 1000,
    nullable: true,
    comment: "目录",
  })
  catalog?: string;

  @Column({
    length: 2000,
    comment: "图书封面",
    nullable: true,
  })
  coverUrl?: string;

  @Column()
  pressId!: number;

  @ManyToOne(() => Press)
  @JoinColumn({ name: "pressId" })
  press?: Press;
}
