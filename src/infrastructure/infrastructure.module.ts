import { Module } from '@nestjs/common';
import { TypeOrmModule as NestTypeOrmModule } from '@nestjs/typeorm';
import { GroupEntityOrm } from './persistence/typeorm/entities/group.entity-orm';
import { UserEntityOrm } from './persistence/typeorm/entities/user.entity-orm';
import { GroupMemberEntityOrm } from './persistence/typeorm/entities/group-member.entity-orm';
import { TypeOrmModule } from './persistence/typeorm/typeorm.module';
import { MongoModule } from './persistence/mongo/mongo.module';
import { KafkaModule } from './messages/kafka/kafka.module';
import { EventStoreModule } from './persistence/event-store/event-store.module';
import { CassandraModule } from './persistence/cassandra/cassandra.module';

@Module({
  imports: [
    MongoModule,
    TypeOrmModule,
    NestTypeOrmModule.forFeature([
      GroupEntityOrm,
      UserEntityOrm,
      GroupMemberEntityOrm,
    ]),
    KafkaModule,
    EventStoreModule,
    CassandraModule,
  ],
  exports: [
    TypeOrmModule,
    NestTypeOrmModule,
    MongoModule,
    KafkaModule,
    EventStoreModule,
    CassandraModule,
  ],
})
export class InfrastructureModule {}
