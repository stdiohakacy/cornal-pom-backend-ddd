import { Module } from '@nestjs/common';
import { InfrastructureModule } from 'src/infrastructure/infrastructure.module';
import { repositoryPorts } from './repositories';
import { useCases } from './use-cases';
import { groupCommandHandlers } from './commands/handlers';
import { groupEventHandlers } from './events/groups/app/handlers';
import { eventPorts } from './events';

const providers = [
  ...useCases,
  ...repositoryPorts,
  ...eventPorts,
  ...groupCommandHandlers,
  ...groupEventHandlers,
];
@Module({
  imports: [InfrastructureModule],
  providers,
  exports: [...providers],
})
export class ApplicationModule {}
