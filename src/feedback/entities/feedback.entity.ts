import { Course } from 'src/courses/entities/course.entity';
import { User } from 'src/users/entity/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { TicketStatus } from '../enum/feedback.enum';

@Entity()
export class Feedback {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 10 })
  ticket_id: string;

  @Column({ type: 'varchar', length: 40 })
  problem: string;

  @Column({ type: 'enum', enum: TicketStatus, default: TicketStatus.ACTIVE })
  status: TicketStatus;

  @Column({ type: 'text', width: 400 })
  details: string;

  @CreateDateColumn({
    precision: null,
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  created: Date;

  @UpdateDateColumn({
    precision: null,
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
    onUpdate: 'CURRENT_TIMESTAMP',
  })
  updated: Date;

  @Column({ type: 'varchar', length: 200, default: null })
  feedbackMessage: string | null;

  @ManyToOne(() => Course, (course) => course.feedback)
  course: Course;

  @ManyToOne(() => User, (user) => user.feedback)
  user: User;
}
