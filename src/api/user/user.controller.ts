import { Controller, Get, Post, Body, Patch, Param, Delete,Request, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { ChangePassword, SigninUserDto, SignupUserDto, UpdateUserDto } from './dto';
import { AdminGuard, UserGuard } from 'src/guards';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from 'src/db';

@ApiTags('Users')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @ApiOperation({ summary: 'signup user' })
  // @ApiResponse({status: 201, type: User})
  @Post('/signup')
  create(@Body() createUserDto: SignupUserDto) {
    return this.userService.signup(createUserDto);
  }

  @ApiOperation({ summary: 'signin user' })
  @ApiResponse({status: 200, description: 'return token'})
  @Post('/signin')
  singin(@Body() singinUserDto: SigninUserDto) {
    return this.userService.signin(singinUserDto)
  }

  @ApiOperation({ summary: 'change password of user' })
  @ApiResponse({ status: 200, description: 'return message about success' })
  @UseGuards(UserGuard)
  @Post('changePassword')
  changePassword(@Body() change: ChangePassword, @Request() req: Request) {
    return this.userService.changePassword(change, req)
  }

  @ApiOperation({ summary: 'find all user' })
  // @ApiResponse({ status: 200, type: [User]})
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @ApiOperation({ summary: 'find self info of user' })
  // @ApiResponse({ status: 200, type: User })
  @UseGuards(UserGuard)
  @Get('selfInfo')
  getSelfInfo(@Request() req: Request) {
    return this.userService.getSelfInfo(req)
  }

  @ApiOperation({ summary: 'find one user' })
  // @ApiResponse({ status: 200, type: User })
  @UseGuards(AdminGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @ApiOperation({ summary: 'update self user' })
  @ApiResponse({ status: 200, type: User })
  @UseGuards(UserGuard)
  @Patch('update')
  update(@Request() req: Request, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(updateUserDto, req);
  }

  @ApiOperation({ summary: 'remove user' })
  @ApiResponse({ status: 200, description: 'return message about success'})
  @UseGuards(AdminGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
