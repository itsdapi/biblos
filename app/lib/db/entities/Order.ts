import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { OrderStatus } from "@/app/lib/type";

@Entity({ name: "orders" })
export class Order {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "uuid" })
  userId!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @Column()
  totalAmount!: number;

  @Column({ default: OrderStatus.Pending, type: "int" })
  orderStatus!: OrderStatus;

  @OneToMany(() => OrderItem, (orderItem) => orderItem.order, {
    cascade: true,
    onDelete: "CASCADE",
  })
  items!: OrderItem[];
}

@Entity({ name: "order_item" })
export class OrderItem {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  quantity!: number;

  @Column()
  totalAmount!: number;

  @CreateDateColumn()
  createdAt!: Date;

  @ManyToOne(() => Order, (order) => order.items)
  order!: Order;

  @Column()
  orderId!: number;
}
