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
import { Question } from '../../question/entities/question.entity';

@Entity()
export class Topic {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 40 })
  title: string;

  @Column({ type: 'varchar', length: 80 })
  description: string;

  @ManyToOne(() => Course, (course) => course.topics, {
    onDelete: 'CASCADE',
  })
  course: Course;

  @OneToMany(() => Content, (content) => content.topic, {
    cascade: true,
  })
  contents: Content[];

  @OneToMany(() => Question, (question) => question.topic, {
    cascade: true,
  })
  questions: Question[];

  @OneToMany(() => Progress, (progress) => progress.topic, {
    cascade: true,
  })
  topicProgress: Progress[];

  @CreateDateColumn({
    precision: null,
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;
}
