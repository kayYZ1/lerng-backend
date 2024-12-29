import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Topic } from '../../topic/entities/topic.entity';
import { QuestionType } from '../enums/question.enum';

@Entity()
export class Question {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 125 })
  question: string;

  @Column({ type: 'enum', enum: QuestionType })
  type: QuestionType;

  @Column({ type: 'varchar', length: 25 })
  answer: string | boolean;

  @ManyToOne(() => Topic, (topic) => topic.questions, {
    onDelete: 'CASCADE',
  })
  topic: Topic;
}
