import { Controller, Get, Post, Patch, Body, Param, Request, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { BookingsService } from './bookings.service'
import { BookingStatus } from './booking.entity'

@Controller('bookings')
@UseGuards(AuthGuard('jwt'))
export class BookingsController {
  constructor(private bookingsService: BookingsService) {}

  @Post()
  create(@Request() req: any, @Body() dto: any) {
    return this.bookingsService.create(req.user.id, dto)
  }

  @Get()
  findMyBookings(@Request() req: any) {
    return this.bookingsService.findByUser(req.user.id)
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookingsService.findOne(+id)
  }

  @Patch(':id/status')
  updateStatus(@Param('id') id: string, @Body('status') status: BookingStatus) {
    return this.bookingsService.updateStatus(+id, status)
  }
}