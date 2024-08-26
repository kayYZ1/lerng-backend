import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Course } from '../../courses/entities/course.entity';
import { User } from '../../users/entity/user.entity';

@Entity()
export class Enrolled {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', default: 0 })
  progress: number;

  @ManyToOne(() => User, (user) => user.enrolled)
  user: User;

  @ManyToOne(() => Course, (course) => course.enrolled)
  course: Course;
}
