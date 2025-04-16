import { Type } from 'class-transformer';
import { IsNotEmpty, IsString } from 'class-validator';

export class GroupCreateGrpcDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  creatorUserId: string;
}

export class GroupCreateGrpcRequestDto {
  @IsNotEmpty()
  @IsString()
  @Type(() => GroupCreateGrpcDto)
  group: GroupCreateGrpcDto;
}
