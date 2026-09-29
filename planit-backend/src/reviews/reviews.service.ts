import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Review } from './review.entity'

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review)
    private reviewRepo: Repository<Review>,
  ) { }

  create(userId: number, dto: any) {
    const review = this.reviewRepo.create({
      ...dto,
      user: { id: userId },
      venue: dto.venueId ? { id: dto.venueId } : null,
      organizer: dto.organizerId ? { id: dto.organizerId } : null,
    })
    return this.reviewRepo.save(review)
  }

  findByVenue(venueId: number) {
    return this.reviewRepo.find({
      where: { venue: { id: venueId } },
      relations: { user: true },
      order: { createdAt: 'DESC' },
    })
  }

  findByOrganizer(organizerId: number) {
    return this.reviewRepo.find({
      where: { organizer: { id: organizerId } },
      relations: { user: true },
      order: { createdAt: 'DESC' },
    })
  }

  countByUser(userId: number) {
    return this.reviewRepo.count({ where: { user: { id: userId } } })
  }

}