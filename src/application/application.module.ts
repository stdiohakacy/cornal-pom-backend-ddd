import { Module } from '@nestjs/common';
import { InfrastructureModule } from 'src/infrastructure/infrastructure.module';
import { repositoryPorts } from './repositories';
import { useCases } from './use-cases';
import { groupCommandHandlers } from './commands/handlers';

const providers = [...useCases, ...repositoryPorts, ...groupCommandHandlers];
@Module({
  imports: [InfrastructureModule],
  providers,
  exports: providers,
})
export class ApplicationModule {}
