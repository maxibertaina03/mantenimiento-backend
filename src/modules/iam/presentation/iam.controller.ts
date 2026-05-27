import { Controller, Get, Param, Query, Patch, Body, Delete, HttpCode } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CurrentUser, type AuthenticatedUser } from '@/common/decorators/current-user.decorator';
import { GetCurrentUserUseCase } from '../application/get-current-user.use-case';
import { ListUsersUseCase } from '../application/list-users.use-case';
import { GetUserUseCase } from '../application/get-user.use-case';
import { UpdateUserUseCase } from '../application/update-user.use-case';
import { DeleteUserUseCase } from '../application/delete-user.use-case';
import { UserResponseDto } from './user-response.dto';
import { UpdateUserRequestDto } from './dtos/update-user.request.dto';

@ApiTags('iam')
@ApiBearerAuth('clerk')
@Controller({ path: 'iam/users', version: '1' })
export class IamController {
  constructor(
    private readonly getCurrentUser: GetCurrentUserUseCase,
    private readonly listUsers: ListUsersUseCase,
    private readonly getUser: GetUserUseCase,
    private readonly updateUser: UpdateUserUseCase,
    private readonly deleteUser: DeleteUserUseCase,
  ) {}

  @Get('me')
  @ApiOkResponse({ type: UserResponseDto })
  async me(@CurrentUser() user: AuthenticatedUser): Promise<UserResponseDto> {
    const domainUser = await this.getCurrentUser.execute(user.id);
    return UserResponseDto.from(domainUser);
  }

  @Get()
  @ApiOkResponse({ type: [UserResponseDto] })
  async list(
    @Query('skip') skip?: number,
    @Query('take') take?: number,
  ) {
    const output = await this.listUsers.execute({ skip, take });
    return {
      items: output.items.map((item) => ({
        id: item.id,
        username: item.username,
        email: item.email,
        firstName: item.firstName,
        lastName: item.lastName,
        fullName: item.fullName,
        role: item.role,
        status: item.status,
        createdAt: item.createdAt,
      })),
      total: output.total,
    };
  }

  @Get(':id')
  @ApiOkResponse({ type: UserResponseDto })
  async get(@Param('id') id: string): Promise<UserResponseDto> {
    return await this.getUser.execute(id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: UserResponseDto })
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateUserRequestDto,
  ): Promise<UserResponseDto> {
    return await this.updateUser.execute({
      id,
      firstName: dto.firstName,
      lastName: dto.lastName,
      role: dto.role,
    });
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: string): Promise<void> {
    await this.deleteUser.execute(id);
  }
}
