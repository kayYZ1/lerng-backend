import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

import { Course } from "../../courses/entities/course.entity";

@Entity()
export class CourseModule {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar" })
  title: string;

  @ManyToOne(() => Course, (course) => course.modules)
  course: Course;
}