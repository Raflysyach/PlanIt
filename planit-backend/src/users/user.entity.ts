import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, OneToMany } from 'typeorm'
import { Booking } from '../bookings/booking.entity'
import { Review } from '../reviews/review.entity'

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id!: number

  @Column({ unique: true })
  email!: string

  @Column({ unique: true })
  username!: string

  @Column({ nullable: true })
  password!: string

  @Column()
  fullName!: string

  @Column({ nullable: true })
  phone!: string

  @Column({ nullable: true })
  location!: string

  @Column({ nullable: true })
  gender!: string

  @Column({ nullable: true })
  dateOfBirth!: string

  @Column({ nullable: true })
  avatar!: string

  @Column({ default: false })
  isVerified!: boolean

  @Column({ nullable: true })
  googleId!: string

  @CreateDateColumn()
  createdAt!: Date

  @OneToMany(() => Booking, (booking) => booking.user)
  bookings!: Booking[]

  @OneToMany(() => Review, (review) => review.user)
  reviews!: Review[]
}