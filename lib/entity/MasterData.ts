import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity()
export class MasterData {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  category!: string; // เช่น 'businessUnits', 'departments', ...

  @Column()
  name!: string;

  @Column({ nullable: true })
  code?: string;

  @Column({ nullable: true })
  description?: string;

  @Column({ default: 'Active' })
  status!: 'Active' | 'Inactive';

  @CreateDateColumn()
  createdDate!: Date;
}
