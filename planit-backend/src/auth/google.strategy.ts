import { Injectable } from '@nestjs/common'
import { PassportStrategy } from '@nestjs/passport'
import { Strategy, VerifyCallback } from 'passport-google-oauth20'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { User } from '../users/user.entity'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
    private jwtService: JwtService,
  ) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
      callbackURL: `${process.env.BACKEND_URL || 'http://localhost:3000'}/auth/google/callback`,
      scope: ['email', 'profile'],
      passReqToCallback: false,
    })
  }

  async validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback) {
    const { emails, displayName, id } = profile
    const email = emails[0].value

    let user = await this.userRepo.findOne({ where: { email } })

    if (!user) {
      user = await this.userRepo.save({
        email,
        fullName: displayName,
        username: email.split('@')[0] + '_' + id.slice(0, 4),
        googleId: id,
        isVerified: true,
      })
    }

    const token = this.jwtService.sign({ sub: user.id, email: user.email })
    done(null, { user, token })
  }
}