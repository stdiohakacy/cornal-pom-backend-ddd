import { Controller } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { GrpcMethod, RpcException } from '@nestjs/microservices';
import { GroupCreateGrpcRequestDto } from '../dtos/group/group.create.grpc.dto';
import { plainToInstance } from 'class-transformer';
import { GroupCreateDto } from 'src/application/dtos/group/group.create.dto';
import { GroupCreateCommand } from 'src/application/commands';
import { GroupCreateResponse } from 'src/application/use-cases/group/group.create.use-case';
import { GroupErrors } from 'src/domain/bounded-context/group/errors/group.errors';
import { status } from '@grpc/grpc-js';
import { RepositoryError } from '@shared/errors/infrastructure.error';

@Controller()
export class GroupController {
  constructor(private readonly commandBus: CommandBus) {}

  @GrpcMethod('GroupInfoService', 'CreateGroup')
  async createGroup(reqGrpcDto: GroupCreateGrpcRequestDto) {
    const appDto = plainToInstance(GroupCreateDto, reqGrpcDto.group);
    const result: GroupCreateResponse = await this.commandBus.execute(
      new GroupCreateCommand(appDto),
    );

    if (result.isLeft()) {
      const error = result.value;
      console.log(error);

      if (error instanceof GroupErrors.CreatorNotFoundError) {
        throw new RpcException({
          code: status.NOT_FOUND,
          message: error.getErrorValue().message,
        });
      }

      if (error instanceof GroupErrors.InvalidGroupError) {
        throw new RpcException({
          code: status.INVALID_ARGUMENT,
          message: error.getErrorValue().message,
        });
      }

      if (error instanceof RepositoryError) {
        throw new RpcException({
          code: status.INTERNAL,
          message: error.message,
        });
      }

      throw new RpcException({
        code: status.UNKNOWN,
        message: 'Unexpected error',
      });
    }

    return result.value;
  }
}
