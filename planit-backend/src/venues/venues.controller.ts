import { Controller, Get, Param, Query, Post } from '@nestjs/common'
import { VenuesService } from './venues.service'

@Controller('venues')
export class VenuesController {
  constructor(private venuesService: VenuesService) {}

  @Get()
  findAll(
    @Query('category') category?: string,
    @Query('location') location?: string,
  ) {
    return this.venuesService.findAll(category, location)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.venuesService.findOne(+id)
  }

  @Post('seed')
  seed() {
    return this.venuesService.seed()
  }
}