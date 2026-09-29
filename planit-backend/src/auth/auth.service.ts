import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm'
import { JwtService } from '@nestjs/jwt'
import * as bcrypt from 'bcrypt'
import { User } from '../users/user.entity'
import { RegisterDto } from './dto/register.dto'
import { LoginDto } from './dto/login.dto'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async register(dto: RegisterDto) {
    const exists = await this.userRepo.findOne({
      where: [{ email: dto.email }, { username: dto.username }],
    })
    if (exists) throw new ConflictException('Email or username already exists')

    const hashed = await bcrypt.hash(dto.password, 10)
    const user = this.userRepo.create({
      ...dto,
      password: hashed,
    })
    await this.userRepo.save(user)

    const token = this.jwtService.sign({ sub: user.id, email: user.email })
    return { token, user: { id: user.id, email: user.email, username: user.username, fullName: user.fullName } }
  }

  async login(dto: LoginDto) {
    const user = await this.userRepo.findOne({ where: { email: dto.email } })
    if (!user) throw new UnauthorizedException('Invalid credentials')

    const valid = await bcrypt.compare(dto.password, user.password)
    if (!valid) throw new UnauthorizedException('Invalid credentials')

    const token = this.jwtService.sign({ sub: user.id, email: user.email })
    return { token, user: { id: user.id, email: user.email, username: user.username, fullName: user.fullName } }
  }

  async validateUser(userId: number) {
    return this.userRepo.findOne({ where: { id: userId } })
  }
}