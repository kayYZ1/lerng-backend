import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { LearningModule } from '../../modules/entities/module.entity';
import { User } from '../../users/entity/user.entity';

@Entity()
export class Course {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: 'varchar', length: 40 })
  title: string;

  @Column({ type: "varchar", length: 200 })
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

  @ManyToOne(() => User, (user) => user.courses)
  user: User; 
}
