import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Topic } from '../../topics/entities/topics.entity';

@Entity()
export class Content {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 40 })
  title: string;

  @Column({ type: 'varchar', length: 200 })
  description: string;

  @Column({ type: 'text', width: 150 })
  paragraph150: string;

  @Column({ type: 'text', width: 300 })
  paragraph300: string;

  @Column({ type: 'varchar', nullable: true })
  videoUrl: string;

  @ManyToOne(() => Topic, (topic) => topic.contents)
  topic: Topic;
}
