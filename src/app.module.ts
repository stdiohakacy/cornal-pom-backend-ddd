import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { POMDatabaseModule } from './infrastructure/repositories/typeorm/pom.database.module';

@Module({
  imports: [POMDatabaseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
