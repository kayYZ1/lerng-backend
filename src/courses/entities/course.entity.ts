import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { CourseModule } from '../../modules/entities/module.entity';

@Entity()
export class Course {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'varchar' })
  imageUrl: string;

  @OneToMany(() => CourseModule, (module) => module.course)
  modules: CourseModule[];
}
