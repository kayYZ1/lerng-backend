import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Content } from '../../contents/entities/content.entity';
import { Course } from '../../courses/entities/course.entity';
import { Progress } from '../../progress/entities/progress.entity';
import { Question } from '../../questions/entities/question.entity';

@Entity()
export class Topic {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 40 })
  title: string;

  @Column({ type: 'varchar', length: 80 })
  description: string;

  @ManyToOne(() => Course, (course) => course.topics)
  course: Course;

  @OneToMany(() => Content, (content) => content.topic)
  contents: Content[];

  @OneToMany(() => Question, (question) => question.topic)
  questions: Question[];

  @OneToMany(() => Progress, (progress) => progress.topic)
  topicProgress: Progress[];

  @CreateDateColumn({
    precision: null,
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;
}
