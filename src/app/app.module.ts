import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { PresentationModule } from 'src/presentation/presentation.module';
import { AppMiddlewareModule } from './app.middleware.module';

@Module({
  imports: [CqrsModule.forRoot(), PresentationModule, AppMiddlewareModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
