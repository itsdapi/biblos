import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity({ name: "comment" })
export class Comment {
  @PrimaryGeneratedColumn()
  id?: number;

  @Column({ type: "uuid" })
  userId!: string;

  @Column({ comment: "where comment belongs to" })
  postId!: number;

  @CreateDateColumn()
  createdAt?: Date;

  @Column()
  content!: string;

  @Column({ nullable: true, comment: "parent comment id" })
  parentId?: number;
}
