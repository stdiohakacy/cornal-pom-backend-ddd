import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { GroupCreateCommand } from '../group.create.command';
import {
  GroupCreateResponse,
  CreateGroupUseCase,
} from 'src/application/use-cases/group/group.create.use-case';

@CommandHandler(GroupCreateCommand)
export class CreateGroupCommandHandler
  implements ICommandHandler<GroupCreateCommand, GroupCreateResponse>
{
  constructor(private readonly createGroupUseCase: CreateGroupUseCase) {}

  execute(command: GroupCreateCommand): Promise<GroupCreateResponse> {
    return this.createGroupUseCase.execute(command.dto);
  }
}
