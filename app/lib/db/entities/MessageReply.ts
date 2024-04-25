// import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from "typeorm";
// import { Message } from "./Message";
// import { Employee } from "./Employee";
// import { Member } from "./Member";
//
// @Entity()
// export class MessageReply {
//   @ManyToOne(() => Message, { primary: true })
//   @JoinColumn({ name: "messageNo" })
//   message!: Message;
//
//   @PrimaryColumn({
//     type: "char",
//     length: 4,
//     comment: "回复编号",
//   })
//   replyNo!: string;
//
//   @ManyToOne(() => Employee)
//   @JoinColumn({ name: "employeeNo" })
//   employee!: Employee;
//
//   @ManyToOne(() => Member)
//   @JoinColumn({ name: "memberNo" })
//   member!: Member;
//
//   @Column({
//     type: "timestamp",
//     nullable: true,
//     comment: "回复时间",
//   })
//   replyDate!: Date;
//
//   @Column({
//     type: "varchar2",
//     length: 100,
//     nullable: true,
//     comment: "回复内容",
//   })
//   replyContent!: string;
// }
