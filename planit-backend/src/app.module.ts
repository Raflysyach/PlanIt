import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { TypeOrmModule } from '@nestjs/typeorm'
import { User } from './users/user.entity'
import { Venue } from './venues/venue.entity'
import { Organizer } from './organizers/organizer.entity'
import { Booking } from './bookings/booking.entity'
import { Review } from './reviews/review.entity'
import { AuthModule } from './auth/auth.module'
import { VenuesModule } from './venues/venues.module'
import { OrganizersModule } from './organizers/organizers.module'
import { BookingsModule } from './bookings/bookings.module'
import { ReviewsModule } from './reviews/reviews.module'
import { UsersModule } from './users/users.module'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '3306'),
      username: process.env.DB_USERNAME || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'planit_db',
      ssl: process.env.DB_SSL === 'true' ? { rejectUnauthorized: false } : undefined,
      entities: [User, Venue, Organizer, Booking, Review],
      synchronize: true,
    }),
    AuthModule,
    VenuesModule,
    OrganizersModule,
    BookingsModule,
    ReviewsModule,
  ],
})
export class AppModule {}