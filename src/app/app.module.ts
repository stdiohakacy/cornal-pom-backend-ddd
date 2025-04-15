import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { PresentationModule } from 'src/presentation/presentation.module';

@Module({
  imports: [CqrsModule.forRoot(), PresentationModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
