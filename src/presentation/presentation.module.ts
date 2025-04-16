import { Module } from '@nestjs/common';
import { ApplicationModule } from 'src/application/application.module';
import { GroupController } from './grpc/controllers/group.controller';

@Module({
  imports: [ApplicationModule],
  controllers: [GroupController],
  providers: [],
  exports: [],
})
export class PresentationModule {}
