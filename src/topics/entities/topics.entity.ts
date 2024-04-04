import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Course } from '../../courses/entities/course.entity';
import { Content } from '../../contents/entities/content.entity';

@Entity()
export class Topic {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: 'varchar', length: 40 })
  title: string;

  @Column({ type: "varchar", length: 80 })
  description: string;

  @ManyToOne(() => Course, (course) => course.topics)
  course: Course;

  @OneToMany(() => Content, (content) => content.topic)
  contents: Content[];
}
