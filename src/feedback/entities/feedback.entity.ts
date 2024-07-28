import { Course } from 'src/courses/entities/course.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Feedback {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 10 })
  ticket_id: string;

  @Column({ type: 'varchar', length: 40 })
  problem: string;

  @Column({ type: 'text', width: 400 })
  details: string;

  @ManyToOne(() => Course, (course) => course.feedback)
  course: Course;
}
