import { Controller, Get, Patch, Body, Request, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { UsersService } from './users.service'

@Controller('users')
@UseGuards(AuthGuard('jwt'))
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('me')
  getMe(@Request() req: any) {
    return this.usersService.findOne(req.user.id)
  }

  @Patch('me')
  updateMe(@Request() req: any, @Body() dto: any) {
    return this.usersService.update(req.user.id, dto)
  }
}