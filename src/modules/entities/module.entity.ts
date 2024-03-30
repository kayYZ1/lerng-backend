import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Course } from '../../courses/entities/course.entity';
import { ModuleContent } from '../../contents/entities/content.entity';

@Entity()
export class LearningModule {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: 'varchar', length: 40 })
  title: string;

  @Column({ type: "varchar", length: 80 })
  description: string;

  @ManyToOne(() => Course, (course) => course.modules)
  course: Course;

  @OneToMany(() => ModuleContent, (content) => content.module)
  contents: ModuleContent[];
}
