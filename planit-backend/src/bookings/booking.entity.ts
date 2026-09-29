import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm'
import { User } from '../users/user.entity'
import { Venue } from '../venues/venue.entity'
import { Organizer } from '../organizers/organizer.entity'

export enum BookingStatus {
  ONGOING = 'Ongoing',
  COMPLETED = 'Completed',
  CANCELLED = 'Cancelled',
}

@Entity('bookings')
export class Booking {
  @PrimaryGeneratedColumn()
  id!: number

  @ManyToOne(() => User, (user) => user.bookings)
  user!: User

  @ManyToOne(() => Venue, (venue) => venue.bookings, { nullable: true })
  venue!: Venue

  @ManyToOne(() => Organizer, (organizer) => organizer.bookings, { nullable: true })
  organizer!: Organizer

  @Column()
  eventName!: string

  @Column()
  eventDate!: string

  @Column()
  guests!: number

  @Column()
  eventLocation!: string

  @Column({ nullable: true })
  notes!: string

  @Column()
  packageName!: string

  @Column('decimal', { precision: 15, scale: 2 })
  totalPrice!: number

  @Column('decimal', { precision: 15, scale: 2 })
  dpAmount!: number

  @Column({ type: 'enum', enum: BookingStatus, default: BookingStatus.ONGOING })
  status!: BookingStatus

  @Column()
  paymentMethod!: string

  @Column({ nullable: true })
  bookingCode!: string

  @CreateDateColumn()
  createdAt!: Date
}