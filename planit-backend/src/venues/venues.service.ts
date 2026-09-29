import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Venue } from './venue.entity'

@Injectable()
export class VenuesService {
  constructor(
    @InjectRepository(Venue)
    private venueRepo: Repository<Venue>,
  ) {}

  findAll(category?: string, location?: string) {
    const query = this.venueRepo.createQueryBuilder('venue')
    if (category && category !== 'All') {
      query.andWhere('venue.category = :category', { category })
    }
    if (location) {
      query.andWhere('venue.location LIKE :location', { location: `%${location}%` })
    }
    return query.getMany()
  }

  findOne(id: number) {
    return this.venueRepo.findOne({ where: { id } })
  }

  seed() {
    const venues = [
      { name: 'Le Blanc Wedding Hall', location: 'BSD, Tangerang', category: 'Wedding', description: 'Premium wedding hall with elegant decoration', price: 18000000, badge: 'Popular', emoji: '💍', capacity: '100 – 300', rating: 4.9, reviewCount: 97 },
      { name: 'Amanjiwo Grand Ballroom', location: 'Jakarta Selatan', category: 'Seminar', description: 'Grand ballroom for corporate events', price: 25000000, badge: 'Premium', emoji: '🏛️', capacity: '300 – 500', rating: 4.8, reviewCount: 210 },
      { name: 'Groovy Garden Venue', location: 'Bogor', category: 'Wedding', description: 'Beautiful garden venue for outdoor events', price: 22000000, badge: '', emoji: '🌿', capacity: '100 – 300', rating: 4.7, reviewCount: 84 },
      { name: 'Pullman Hotel Banquet', location: 'Jakarta Selatan', category: 'Seminar', description: 'Professional hotel banquet hall', price: 20000000, badge: '', emoji: '🏨', capacity: '300 – 500', rating: 4.5, reviewCount: 142 },
      { name: 'The Ritz Ballroom', location: 'Jakarta Pusat', category: 'Wedding', description: 'Luxury ballroom for grand weddings', price: 35000000, badge: 'Premium', emoji: '👑', capacity: '500+', rating: 4.8, reviewCount: 198 },
      { name: 'Puri Santrian Beach', location: 'Bali', category: 'Wedding', description: 'Stunning beachfront venue', price: 45000000, badge: 'Popular', emoji: '🌊', capacity: '100 – 300', rating: 4.9, reviewCount: 320 },
      { name: 'Lumière Photo Studio', location: 'Bandung', category: 'Photoshoot', description: 'Professional photography studio', price: 5000000, badge: 'New', emoji: '📷', capacity: '< 100 guests', rating: 4.9, reviewCount: 312 },
      { name: 'Grand Mercure Convention', location: 'Jakarta', category: 'Corporate', description: 'Large convention center for corporate events', price: 30000000, badge: '', emoji: '🏢', capacity: '500+', rating: 4.6, reviewCount: 175 },
    ]
    return this.venueRepo.save(venues)
  }
}