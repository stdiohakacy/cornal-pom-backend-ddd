import { ICommand } from '@nestjs/cqrs';
import { GroupCreateDto } from '../dtos/group/group.create.dto';

export class GroupCreateCommand implements ICommand {
  constructor(public readonly dto: GroupCreateDto) {}
}
