import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoursesModule } from 'src/courses/courses.module';
import { UsersModule } from 'src/users/users.module';
import { EnrolledController } from './enrolled.controller';
import { EnrolledService } from './enrolled.service';
import { Enrolled } from './entities/enrolled.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Enrolled]),
    CoursesModule,
    UsersModule,
  ],
  controllers: [EnrolledController],
  providers: [EnrolledService],
  exports: [EnrolledService],
})
export class EnrolledModule {}
