import { Module } from '@nestjs/common';
import { TypeOrmModule as NestTypeOrmModule } from '@nestjs/typeorm';
import { GroupEntityOrm } from './persistence/typeorm/entities/group.entity-orm';
import { UserEntityOrm } from './persistence/typeorm/entities/user.entity-orm';
import { GroupMemberEntityOrm } from './persistence/typeorm/entities/group-member.entity-orm';
import { TypeOrmModule } from './persistence/typeorm/typeorm.module';
import { MongoModule } from './persistence/mongo/mongo.module';
import { KafkaClientModule } from './messages/kafka/kafka-client.module';

@Module({
  imports: [
    MongoModule,
    TypeOrmModule,
    NestTypeOrmModule.forFeature([
      GroupEntityOrm,
      UserEntityOrm,
      GroupMemberEntityOrm,
    ]),
    KafkaClientModule,
  ],
  exports: [TypeOrmModule, NestTypeOrmModule, MongoModule, KafkaClientModule],
})
export class InfrastructureModule {}
