import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Topic } from '../../topics/entities/topics.entity';
import { User } from '../../users/entity/user.entity';

@Entity()
export class Course {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 40 })
  title: string;

  @Column({ type: 'varchar', length: 200 })
  description: string;

  @Column({ type: 'varchar' })
  imageUrl: string;

  @CreateDateColumn({
    precision: null,
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  created: Date;

  @OneToMany(() => Topic, (topic) => topic.course)
  topics: Topic[];

  @ManyToOne(() => User, (user) => user.courses)
  user: User;
}
