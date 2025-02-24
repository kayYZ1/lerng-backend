import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import dbConfig from './config/db.config';
import { ContentsModule } from './contents/contents.module';
import { CoursesModule } from './courses/courses.module';
import { EnrolledModule } from './enrolled/enrolled.module';
import { FeedbackModule } from './feedback/feedback.module';
import { MailModule } from './mail/mail.module';
import { ProgressModule } from './progress/progress.module';
import { QuestionsModule } from './question/question.module';
import { TopicsModule } from './topic/topic.module.';
import { UsersModule } from './user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [
        ConfigModule.forRoot({
          load: [dbConfig],
          envFilePath: `${process.cwd()}/src/config/env/.env.${process.env.NODE_ENV}`,
        }),
      ],
      useFactory: (configService: ConfigService) => ({
        type: configService.get<string>('db.type') as any,
        host: configService.get<string>('db.host'),
        port: configService.get<number>('db.port'),
        username: configService.get<string>('db.username'),
        password: configService.get<string>('db.password'),
        database: configService.get<string>('db.database'),
        autoLoadEntities: true,
        synchronize: true,
        logging: true,
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    ContentsModule,
    CoursesModule,
    EnrolledModule,
    ProgressModule,
    QuestionsModule,
    TopicsModule,
    UsersModule,
    MailModule,
    FeedbackModule,
  ],
})
export class AppModule {}
