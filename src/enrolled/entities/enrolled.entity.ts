import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Course } from '../../courses/entities/course.entity';
import { User } from '../../user/entity/user.entity';

@Entity()
export class Enrolled {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'int', default: 0 })
  rating: number;

  @ManyToOne(() => User, (user) => user.enrolled, {
    onDelete: 'CASCADE',
  })
  user: User;

  @ManyToOne(() => Course, (course) => course.enrolled, {
    onDelete: 'CASCADE',
  })
  course: Course;
}
