import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Enrolled } from 'src/enrolled/entities/enrolled.entity';
import { Feedback } from 'src/feedback/entities/feedback.entity';
import { Topic } from '../../topic/entities/topic.entity';
import { User } from '../../user/entity/user.entity';
import { Categories } from '../enum/courses.enum';

@Entity()
export class Course {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 40 })
  title: string;

  @Column({ type: 'varchar', length: 120 })
  description: string;

  @Column({ type: 'set', enum: Categories, default: [] })
  categories: Categories[];

  @Column({ type: 'varchar' })
  imageUrl: string;

  @CreateDateColumn({
    precision: null,
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  created: Date;

  @OneToMany(() => Topic, (topic) => topic.course, {
    cascade: true,
  })
  topics: Topic[];

  @OneToMany(() => Enrolled, (enrolled) => enrolled.course, {
    cascade: true,
  })
  enrolled: Enrolled[];

  @OneToMany(() => Feedback, (feedback) => feedback.course, {
    cascade: true,
  })
  feedback: Feedback[];

  @ManyToOne(() => User, (user) => user.courses, {
    onDelete: 'CASCADE',
  })
  user: User;
}
