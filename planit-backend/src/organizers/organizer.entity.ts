import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm'
import { Booking } from '../bookings/booking.entity'
import { Review } from '../reviews/review.entity'

@Entity('organizers')
export class Organizer {
  @PrimaryGeneratedColumn()
  id!: number

  @Column()
  name!: string

  @Column()
  location!: string

  @Column()
  category!: string

  @Column('text')
  description!: string

  @Column('decimal', { precision: 10, scale: 2 })
  price!: number

  @Column({ nullable: true })
  badge!: string

  @Column({ nullable: true })
  emoji!: string

  @Column({ nullable: true })
  packageType!: string

  @Column('decimal', { precision: 3, scale: 1, default: 0 })
  rating!: number

  @Column({ default: 0 })
  reviewCount!: number

  @Column({ default: true })
  isActive!: boolean

  @CreateDateColumn()
  createdAt!: Date

  @OneToMany(() => Booking, (booking) => booking.venue)
  bookings!: Booking[]

  @OneToMany(() => Review, (review) => review.venue)
  reviews!: Review[]
}