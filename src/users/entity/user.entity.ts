import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { Enrolled } from 'src/enrolled/entities/enrolled.entity';
import { Course } from '../../courses/entities/course.entity';
import { Progress } from '../../progress/entities/progress.entity';
import { UserRole } from '../enums/user.enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 75 })
  password: string;

  @Column({ type: 'varchar', length: 25, unique: true })
  username: string;

  @Column({ type: 'enum', enum: UserRole, default: UserRole.USER })
  role: UserRole;

  @Column({ type: 'varchar' })
  imageUrl: string;

  @CreateDateColumn({
    precision: null,
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  created: Date;

  @Column({ type: 'varchar', nullable: true })
  refreshToken: string | null;

  @OneToMany(() => Course, (course) => course.user)
  courses: Course[];

  @OneToMany(() => Progress, (progress) => progress.user)
  topicProgress: Progress[];

  @OneToMany(() => Enrolled, (enrolled) => enrolled.user)
  enrolled: Enrolled[];
}
