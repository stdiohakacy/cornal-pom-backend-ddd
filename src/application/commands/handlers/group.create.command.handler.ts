import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { GroupCreateCommand } from '../group.create.command';
import {
  GroupCreateResponse,
  GroupCreateUseCase,
} from 'src/application/use-cases/group/group.create.use-case';

@CommandHandler(GroupCreateCommand)
export class CreateGroupCommandHandler
  implements ICommandHandler<GroupCreateCommand, GroupCreateResponse>
{
  constructor(private readonly groupCreateUseCase: GroupCreateUseCase) {}

  execute(command: GroupCreateCommand): Promise<GroupCreateResponse> {
    return this.groupCreateUseCase.execute(command.dto);
  }
}
