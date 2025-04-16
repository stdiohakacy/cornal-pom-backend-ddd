import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { GroupCreateCommand } from '../group.create.command';
import { GroupCreateUseCase } from 'src/application/use-cases/group/group.create.use-case';

@CommandHandler(GroupCreateCommand)
export class GroupCreateHandler
  implements ICommandHandler<GroupCreateCommand, any>
{
  constructor(private readonly groupCreateUseCase: GroupCreateUseCase) {}

  async execute(command: GroupCreateCommand): Promise<any> {
    return this.groupCreateUseCase.execute(command.dto);
  }
}
