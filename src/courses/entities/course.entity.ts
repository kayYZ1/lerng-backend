import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { LearningModule } from '../../modules/entities/module.entity';

@Entity()
export class Course {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: 'varchar', length: 40 })
  title: string;

  @Column({ type: "varchar", length: 80 })
  description: string;

  @Column({ type: 'varchar' })
  imageUrl: string;

  @CreateDateColumn({
    precision: null,
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  created: Date;

  @OneToMany(() => LearningModule, (module) => module.course)
  modules: LearningModule[];
}
