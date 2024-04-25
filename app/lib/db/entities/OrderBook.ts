// import { Entity , Column, ManyToOne, JoinColumn } from "typeorm";
// import { OrderSheet } from "./OrderSheet";
// import { Book } from "./Book";
//
// @Entity()
// export class OrderBook {
//   @ManyToOne(() => OrderSheet, { primary: true })
//   @JoinColumn({ name: "orderNo" })
//   orderSheet: OrderSheet;
//
//   @ManyToOne(() => Book, { primary: true })
//   @JoinColumn({ name: "ISBN" })
//   book: Book;
//
//   @Column({
//     type: "int",
//     nullable: false,
//     comment: "订购数量",
//   })
//   quantity: number;
//
//   @Column({
//     type: "number",
//     nullable: false,
//     comment: "定价",
//   })
//   price: number;
//
//   @Column({
//     type: "number",
//     nullable: true,
//     comment: "应收金额",
//   })
//   amtReceivable: number;
//
//   @Column({
//     type: "float",
//     nullable: false,
//     comment: "图书折扣",
//   })
//   bookDiscount: number;
//
//   @Column({
//     type: "number",
//     nullable: true,
//     comment: "实收金额",
//   })
//   paidAmt: number;
//
//   @Column({
//     type: "int",
//     nullable: false,
//     comment: "已配送数量",
//   })
//   shippedQuantity: number;
//
//   @Column({
//     type: "char",
//     length: 1,
//     nullable: false,
//     comment: "配送状态",
//   })
//   shipState: string;
// }
