import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import pomTypeormConfig from './pom.typeorm.config';
import { RouteLocationConversionEntity } from './entities/route-location-conversion.entity';
import { ServiceScopeEntity } from './entities/service-scope.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...pomTypeormConfig.options,
      autoLoadEntities: true,
    }),
    TypeOrmModule.forFeature([
      RouteLocationConversionEntity,
      ServiceScopeEntity,
    ]),
  ],
})
export class POMDatabaseModule {}
