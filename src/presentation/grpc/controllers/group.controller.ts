import { Controller } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { GrpcMethod } from '@nestjs/microservices';
import { GroupCreateGrpcRequestDto } from '../dtos/group/group.create.grpc.dto';
import { plainToInstance } from 'class-transformer';
import { GroupCreateDto } from 'src/application/dtos/group/group.create.dto';
import { GroupCreateCommand } from 'src/application/commands';

@Controller()
export class GroupController {
  constructor(private readonly commandBus: CommandBus) {}

  @GrpcMethod('GroupInfoService', 'CreateGroup')
  async createGroup(reqGrpcDto: GroupCreateGrpcRequestDto) {
    const appDto = plainToInstance(GroupCreateDto, reqGrpcDto.group);
    await this.commandBus.execute(new GroupCreateCommand(appDto));
  }
}
