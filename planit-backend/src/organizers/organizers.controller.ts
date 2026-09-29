import { Controller, Get, Param, Query, Post } from '@nestjs/common'
import { OrganizersService } from './organizers.service'

@Controller('organizers')
export class OrganizersController {
  constructor(private organizersService: OrganizersService) {}

  @Get()
  findAll(
    @Query('category') category?: string,
    @Query('location') location?: string,
  ) {
    return this.organizersService.findAll(category, location)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.organizersService.findOne(+id)
  }

  @Post('seed')
  seed() {
    return this.organizersService.seed()
  }
}