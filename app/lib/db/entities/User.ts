import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  OneToMany,
  ValueTransformer,
} from "typeorm";

const transformer: Record<"date" | "bigint", ValueTransformer> = {
  date: {
    from: (date: string | null) => date && new Date(parseInt(date, 10)),
    to: (date?: Date) => date?.valueOf().toString(),
  },
  bigint: {
    from: (bigInt: string | null) => bigInt && parseInt(bigInt, 10),
    to: (bigInt?: number) => bigInt?.toString(),
  },
};

@Entity({ name: "users" })
export class UserEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "varchar2", length: 255, nullable: true })
  name!: string | null;

  @Column({ type: "varchar2", length: 255, nullable: true, unique: true })
  email!: string | null;

  @Column({
    type: "varchar2",
    length: 255,
    nullable: true,
    transformer: transformer.date,
  })
  emailVerified!: string | null;

  @Column({ type: "varchar2", length: 255, nullable: true })
  image!: string | null;

  @Column({ type: "varchar2", length: 255, nullable: true, default: 1 })
  role!: string | null;

  @Column({ type: "varchar2", length: 60, nullable: true })
  password!: string | null;

  @OneToMany(() => SessionEntity, (session) => session.userId)
  sessions!: SessionEntity[];

  @OneToMany(() => AccountEntity, (account) => account.userId)
  accounts!: AccountEntity[];
}

@Entity({ name: "accounts" })
export class AccountEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ type: "uuid" })
  userId!: string;

  @Column()
  type!: string;

  @Column()
  provider!: string;

  @Column()
  providerAccountId!: string;

  @Column({ type: "varchar2", length: 2048, nullable: true })
  refresh_token!: string | null;

  @Column({ type: "varchar2", length: 2048, nullable: true })
  access_token!: string | null;

  @Column({
    nullable: true,
    type: "number",
    transformer: transformer.bigint,
  })
  expires_at!: number | null;

  @Column({ type: "varchar2", length: 2048, nullable: true })
  token_type!: string | null;

  @Column({ type: "varchar2", length: 2048, nullable: true })
  scope!: string | null;

  @Column({ type: "varchar2", length: 2048, nullable: true })
  id_token!: string | null;

  @Column({ type: "varchar2", length: 2048, nullable: true })
  session_state!: string | null;

  @Column({ type: "varchar2", length: 2048, nullable: true })
  oauth_token_secret!: string | null;

  @Column({ type: "varchar2", length: 2048, nullable: true })
  oauth_token!: string | null;

  @ManyToOne(() => UserEntity, (user) => user.accounts, {
    createForeignKeyConstraints: true,
  })
  user!: UserEntity;
}

@Entity({ name: "sessions" })
export class SessionEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column({ unique: true })
  sessionToken!: string;

  @Column({ type: "uuid" })
  userId!: string;

  @Column({ transformer: transformer.date })
  expires!: string;

  @ManyToOne(() => UserEntity, (user) => user.sessions)
  user!: UserEntity;
}

@Entity({ name: "verification_tokens" })
export class VerificationTokenEntity {
  @PrimaryGeneratedColumn("uuid")
  id!: string;

  @Column()
  token!: string;

  @Column()
  identifier!: string;

  @Column({ transformer: transformer.date })
  expires!: string;
}
