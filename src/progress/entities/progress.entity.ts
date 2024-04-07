import { Column, Entity, ManyToOne } from 'typeorm';
import { PrimaryGeneratedColumn } from 'typeorm';

import { User } from '../../users/entity/user.entity';
import { Topic } from '../../topics/entities/topics.entity';

@Entity()
export class Progress {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'numeric' })
  quizScore: number;

  @Column({ type: 'numeric' })
  progressScore: number;

  @ManyToOne(() => User, (user) => user.topicProgress)
  user: User;

  @ManyToOne(() => Topic, (topic) => topic.topicProgress)
  topic: Topic;
}
