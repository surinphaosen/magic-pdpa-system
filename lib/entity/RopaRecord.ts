import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

@Entity()
export class RopaRecord {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  activityName!: string;

  @Column()
  department!: string;

  @Column()
  businessUnit!: string;

  @Column()
  dataController!: string;

  @Column()
  contactPerson!: string;

  @Column()
  contactEmail!: string;

  @Column({ nullable: true })
  contactPhone?: string;

  @Column({ nullable: true })
  dpoName?: string;

  @Column({ nullable: true })
  dpoEmail?: string;

  @Column({ nullable: true })
  dpoPhone?: string;

  @Column()
  dataGroups!: string;

  @Column({ nullable: true })
  customDataTypes?: string;

  @Column({ nullable: true })
  relatedAssets?: string;

  @Column()
  purposes!: string;

  @Column({ nullable: true })
  customPurpose?: string;

  @Column({ nullable: true })
  lawfulBasis?: string;

  @Column()
  retentionPeriod!: string;

  @Column({ nullable: true })
  retentionCriteria?: string;

  @Column({ nullable: true })
  disposalMethod?: string;

  @Column({ nullable: true })
  accessRights?: string;

  @Column({ nullable: true })
  accessConditions?: string;

  @Column({ nullable: true })
  accessPersons?: string;

  @Column({ nullable: true })
  disclosureExemptions?: string;

  @Column({ nullable: true })
  customDisclosure?: string;

  @Column({ nullable: true })
  securityMeasures?: string;

  @Column({ nullable: true })
  customSecurity?: string;

  @Column({ nullable: true })
  rejectionCases?: string;

  @Column({ nullable: true })
  objectionCases?: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
