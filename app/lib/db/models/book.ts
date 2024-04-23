import { Entity, PrimaryColumn, Column, ManyToOne, JoinColumn } from "typeorm";
// import { Press } from "./Press"; // Assuming Press entity is defined in a separate file

@Entity()
export class Book {
  @PrimaryColumn({ length: 17 })
  ISBN?: string;

  @Column({ length: 30, nullable: false })
  bookTitle?: string;

  @Column({ length: 40, nullable: false })
  author?: string;

  @Column({ type: "int", nullable: true })
  version?: number;

  @Column({ length: 20, nullable: true })
  category?: string;

  @Column({ type: "int", nullable: true })
  stockNumber?: number;

  @Column({ type: "numeric", nullable: false })
  price?: number;

  @Column({ type: "float", nullable: true })
  bookDiscount?: number;

  @Column({ length: 500, nullable: true })
  introduction?: string;

  @Column({ length: 500, nullable: true })
  catalog?: string;

  @Column({ length: 12, nullable: true })
  pressNo?: string;

  // @ManyToOne(() => Press)
  // @JoinColumn({ name: "pressNo" })
  // press: Press;
}
