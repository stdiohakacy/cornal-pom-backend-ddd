import { Module } from '@nestjs/common';
import { TypeOrmModule as NestTypeOrmModule } from '@nestjs/typeorm';
import { pomTypeormConfig } from './typeorm.config';
import { UserEntityOrm } from './entities/user.entity-orm';
import { GroupEntityOrm } from './entities/group.entity-orm';
import { GroupMemberEntityOrm } from './entities/group-member.entity-orm';

@Module({
  imports: [
    NestTypeOrmModule.forRoot({
      ...pomTypeormConfig,
      autoLoadEntities: true,
    }),
    NestTypeOrmModule.forFeature([
      UserEntityOrm,
      GroupEntityOrm,
      GroupMemberEntityOrm,
    ]),
  ],
})
export class TypeOrmModule {}
