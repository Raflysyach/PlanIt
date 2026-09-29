import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Booking, BookingStatus } from './booking.entity'

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(Booking)
    private bookingRepo: Repository<Booking>,
  ) {}

  async create(userId: number, dto: any) {
    const bookingCode = 'PLN-' + Date.now()
    const booking = this.bookingRepo.create({
      ...dto,
      user: { id: userId },
      bookingCode,
      dpAmount: dto.totalPrice * 0.3,
    })
    return this.bookingRepo.save(booking)
  }

  findByUser(userId: number) {
    return this.bookingRepo.find({
      where: { user: { id: userId } },
      relations: { venue: true, organizer: true },
      order: { createdAt: 'DESC' },
    })
  }

  findOne(id: number) {
    return this.bookingRepo.findOne({
      where: { id },
      relations: { venue: true, organizer: true, user: true },
    })
  }

  async updateStatus(id: number, status: BookingStatus) {
    await this.bookingRepo.update(id, { status })
    return this.findOne(id)
  }
}