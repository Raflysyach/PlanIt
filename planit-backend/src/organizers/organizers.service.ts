import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { Organizer } from './organizer.entity'

@Injectable()
export class OrganizersService {
  constructor(
    @InjectRepository(Organizer)
    private organizerRepo: Repository<Organizer>,
  ) {}

  findAll(category?: string, location?: string) {
    const query = this.organizerRepo.createQueryBuilder('organizer')
    if (category && category !== 'All') {
      query.andWhere('organizer.category = :category', { category })
    }
    if (location) {
      query.andWhere('organizer.location LIKE :location', { location: `%${location}%` })
    }
    return query.getMany()
  }

  findOne(id: number) {
    return this.organizerRepo.findOne({ where: { id } })
  }

  seed() {
    const organizers = [
      { name: 'Le Blanc Wedding Organizer', location: 'BSD, Tangerang', category: 'Wedding', description: 'Premium wedding organizer with 10+ years experience', price: 18000000, badge: 'Popular', emoji: '💍', packageType: 'Full Package', rating: 4.9, reviewCount: 97 },
      { name: 'Party Planner Birthday Org.', location: 'Jawa Tengah', category: 'Birthday', description: 'Fun and creative birthday party organizer', price: 15000000, badge: '', emoji: '🎂', packageType: 'Full Package', rating: 4.4, reviewCount: 125 },
      { name: 'Stellar Concert Production', location: 'Jakarta', category: 'Concert', description: 'Professional concert production team', price: 45000000, badge: '', emoji: '🎤', packageType: 'Full Package', rating: 4.6, reviewCount: 156 },
      { name: 'Lumière Photo Studio', location: 'Bandung', category: 'Photoshoot', description: 'Creative photography and videography', price: 5000000, badge: 'New', emoji: '📷', packageType: 'Photography Only', rating: 4.9, reviewCount: 312 },
      { name: 'Elegant Wedding Organizer', location: 'Jakarta Pusat', category: 'Wedding', description: 'Elegant and sophisticated wedding planning', price: 30000000, badge: '', emoji: '💒', packageType: 'Full Package', rating: 4.8, reviewCount: 198 },
      { name: 'ProEvent Corporate', location: 'Jakarta', category: 'Corporate', description: 'Professional corporate event organizer', price: 20000000, badge: '', emoji: '🎯', packageType: 'Full Package', rating: 4.7, reviewCount: 89 },
      { name: 'Sweet Catering Services', location: 'Tangerang', category: 'Wedding', description: 'Premium catering for all events', price: 8000000, badge: '', emoji: '🍽️', packageType: 'Catering Only', rating: 4.5, reviewCount: 203 },
      { name: 'MC Pro Indonesia', location: 'Jakarta', category: 'Seminar', description: 'Professional MC for all events', price: 3000000, badge: 'Popular', emoji: '🎙️', packageType: 'MC Only', rating: 4.7, reviewCount: 445 },
    ]
    return this.organizerRepo.save(organizers)
  }
}