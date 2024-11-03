import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Topic } from '../../topics/entities/topics.entity';
import { User } from '../../users/entity/user.entity';

@Entity()
export class Progress {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'numeric', default: 0 })
  quizScore: number;

  @Column({ type: 'numeric', default: 0 })
  scorePercentage: number;

  @ManyToOne(() => User, (user) => user.topicProgress)
  user: User;

  @ManyToOne(() => Topic, (topic) => topic.topicProgress)
  topic: Topic;
}
