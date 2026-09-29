import { Controller, Get, Post, Body, Param, Request, UseGuards } from '@nestjs/common'
import { AuthGuard } from '@nestjs/passport'
import { ReviewsService } from './reviews.service'

@Controller('reviews')
export class ReviewsController {
  constructor(private reviewsService: ReviewsService) { }

  @Post()
  @UseGuards(AuthGuard('jwt'))
  create(@Request() req: any, @Body() dto: any) {
    return this.reviewsService.create(req.user.id, dto)
  }

  @Get('venue/:id')
  findByVenue(@Param('id') id: string) {
    return this.reviewsService.findByVenue(+id)
  }

  @Get('organizer/:id')
  findByOrganizer(@Param('id') id: string) {
    return this.reviewsService.findByOrganizer(+id)
  }

  @Get('my/count')
  @UseGuards(AuthGuard('jwt'))
  countMyReviews(@Request() req: any) {
    return this.reviewsService.countByUser(req.user.id)
  }
}