// import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from "typeorm";
// import { StoreSheet } from "./StoreSheet";
// import { Book } from "./Book";
//
// @Entity()
// export class StoreBook {
//   @PrimaryColumn({
//     type: "char",
//     length: 15,
//     comment: "采购单号",
//   })
//   purchasNo: string;
//
//   @PrimaryColumn({
//     type: "char",
//     length: 4,
//     comment: "入库单号",
//   })
//   storeNo: string;
//
//   @PrimaryColumn({
//     type: "char",
//     length: 17,
//     comment: "图书编号",
//   })
//   ISBN: string;
//
//   @Column({
//     type: "int",
//     nullable: false,
//     comment: "入库数量",
//   })
//   quantity: number;
//
//   @ManyToOne(() => StoreSheet, (storeSheet) => storeSheet.storeBooks)
//   @JoinColumn([
//     { name: "purchasNo", referencedColumnName: "purchasNo" },
//     { name: "storeNo", referencedColumnName: "storeNo" },
//   ])
//   storeSheet: StoreSheet;
//
//   @ManyToOne(() => Book)
//   @JoinColumn({ name: "ISBN" })
//   book: Book;
// }
