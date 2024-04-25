// import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from "typeorm";
// import { Member } from "./Member";
// import { Employee } from "./Employee";
//
// @Entity()
// export class OrderSheet {
//   @PrimaryColumn({
//     type: "char",
//     length: 15,
//     comment: "订单编号",
//   })
//   orderNo: string;
//
//   @ManyToOne(() => Member)
//   @JoinColumn({ name: "memberNo" })
//   member: Member;
//
//   @ManyToOne(() => Employee)
//   @JoinColumn({ name: "employeeNo" })
//   employee: Employee;
//
//   @Column({
//     type: "timestamp",
//     nullable: false,
//     comment: "订购日期",
//   })
//   orderDate: Date;
//
//   @Column({
//     type: "number",
//     nullable: true,
//     comment: "应收总金额",
//   })
//   tolAmtReceiva: number;
//
//   @Column({
//     type: "number",
//     nullable: true,
//     comment: "实收总金额",
//   })
//   tolPaidAmount: number;
//
//   @Column({
//     type: "float",
//     nullable: true,
//     comment: "会员折扣",
//   })
//   memDiscount: number;
//
//   @Column({
//     type: "char",
//     length: 1,
//     nullable: false,
//     comment: "付款方式",
//   })
//   payWay: string;
//
//   @Column({
//     type: "char",
//     length: 1,
//     nullable: false,
//     comment: "是否付款",
//   })
//   payFlag: string;
//
//   @Column({
//     type: "char",
//     length: 1,
//     nullable: false,
//     comment: "订单状态",
//   })
//   orderState: string;
//
//   @Column({
//     type: "varchar2",
//     length: 40,
//     nullable: true,
//     comment: "发票单位",
//   })
//   invoiceUnit: string;
// }
