import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import { Member } from "./Member";

@Entity()
export class Message {
  @PrimaryColumn({
    type: "char",
    length: 10,
    comment: "留言编号",
  })
  messageNo!: string;

  @Column({
    type: "char",
    length: 10,
    nullable: false,
    comment: "发布会员编号",
  })
  memberNo!: string;

  @Column({
    type: "timestamp",
    nullable: false,
    comment: "留言日期",
  })
  releaseDate!: Date;

  @Column({
    type: "varchar2",
    length: 100,
    nullable: false,
    comment: "留言内容",
  })
  messageContent!: string;

  @ManyToOne(() => Member)
  @JoinColumn({ name: "memberNo" })
  member!: Member;
}
