import { Module } from '@nestjs/common';
import { InfrastructureModule } from 'src/infrastructure/infrastructure.module';
import { repositoryPorts } from './repositories';
import { useCases } from './use-cases';
import { groupCommandHandlers } from './commands/handlers';
import { groupAppEventHandlers } from './events/groups/app/handlers';
import { eventPorts } from './events';
import { groupIntegrationEventHandlers } from './events/groups/integration/handlers';

const providers = [
  ...useCases,
  ...repositoryPorts,
  ...eventPorts,
  ...groupCommandHandlers,
  ...groupAppEventHandlers,
  ...groupIntegrationEventHandlers,
];
@Module({
  imports: [InfrastructureModule],
  providers,
  exports: [...providers],
})
export class ApplicationModule {}
