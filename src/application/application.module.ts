import { Module } from '@nestjs/common';
import { InfrastructureModule } from 'src/infrastructure/infrastructure.module';
import { repositoryPorts } from './ports/repositories';
import { useCases } from './use-cases';
import { groupCommandHandlers } from './commands/handlers';
import { groupAppEventHandlers } from './events/groups/app/handlers';
import { eventPorts } from './ports';
import { groupIntegrationEventHandlers } from './events/groups/integration/handlers';
import { groupEventHandlers } from './events/groups/domain';
import { BaseDomainEventDispatcher } from '@shared/domain/events/domain.event.dispatcher';

const providers = [
  BaseDomainEventDispatcher,
  ...useCases,
  ...repositoryPorts,
  ...eventPorts,
  ...groupCommandHandlers,
  ...groupAppEventHandlers,
  ...groupIntegrationEventHandlers,
  ...groupEventHandlers,
];
@Module({
  imports: [InfrastructureModule],
  providers,
  exports: [...providers],
})
export class ApplicationModule {}
