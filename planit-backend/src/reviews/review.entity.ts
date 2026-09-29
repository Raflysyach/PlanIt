import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm'
import { User } from '../users/user.entity'
import { Venue } from '../venues/venue.entity'
import { Organizer } from '../organizers/organizer.entity'

@Entity('reviews')
export class Review {
  @PrimaryGeneratedColumn()
  id!: number

  @ManyToOne(() => User, (user) => user.reviews)
  user!: User

  @ManyToOne(() => Venue, (venue) => venue.reviews, { nullable: true })
  venue!: Venue

  @ManyToOne(() => Organizer, (organizer) => organizer.reviews, { nullable: true })
  organizer!: Organizer

  @Column('int')
  rating!: number

  @Column('text')
  comment!: string

  @CreateDateColumn()
  createdAt!: Date
}