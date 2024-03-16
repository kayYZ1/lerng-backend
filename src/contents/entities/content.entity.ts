import { LearningModule } from '../../modules/entities/module.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class ModuleContent {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'varchar' })
  description: string;

  @Column({ type: 'varchar' })
  textFirst: string;

  @Column({ type: 'varchar' })
  textSecond: string;

  @Column({ type: 'varchar', nullable: true })
  imageUrl: string;

  @Column({ type: 'varchar', nullable: true })
  videoUrl: string;

  @ManyToOne(() => LearningModule, (module) => module.contents)
  module: LearningModule;
}
