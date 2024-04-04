import { Topic } from '../../topics/entities/topics.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Content {
  @PrimaryGeneratedColumn("uuid")
  id: string;

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

  @ManyToOne(() => Topic, (topic) => topic.contents)
  topic: Topic;
}
