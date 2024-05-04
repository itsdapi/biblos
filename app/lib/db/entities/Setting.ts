import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: "setting" })
export class Setting {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  key!: string;

  @Column()
  value!: string;
}
