import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CurrentUser, type AuthenticatedUser } from '@/common/decorators/current-user.decorator';
import { GetCurrentUserUseCase } from '../application/get-current-user.use-case';
import { UserResponseDto } from './user-response.dto';

@ApiTags('iam')
@ApiBearerAuth('clerk')
@Controller({ path: 'iam/users', version: '1' })
export class IamController {
  constructor(private readonly getCurrentUser: GetCurrentUserUseCase) {}

  @Get('me')
  @ApiOkResponse({ type: UserResponseDto })
  async me(@CurrentUser() user: AuthenticatedUser): Promise<UserResponseDto> {
    const domainUser = await this.getCurrentUser.execute(user.id);
    return UserResponseDto.from(domainUser);
  }
}
