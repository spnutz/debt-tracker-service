import * as bcrypt from 'bcrypt';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto, RegisterDto } from './dto/auth.dto';
import { ROLE } from 'src/common/constant/enum';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/common/entities/users.entity';
import { Repository } from 'typeorm';
import { DataAlreadyExistsException } from 'src/common/exceptions/data-already-exists.exception';
import { DataNotFoundException } from 'src/common/exceptions/data-not-found.exeption';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(Users)
    private usersResository: Repository<Users>,
    private jwtService: JwtService,
  ) {}

  async register(body: RegisterDto): Promise<void> {
    const user = await this.usersResository.findOne({
      where: { email: body.email },
    });
    if (user)
      throw new DataAlreadyExistsException(
        'This email already exists.',
        'EMAIL_ALREADY_EXISTS',
      );
    const saltOrRounds = 10;
    const hash = await bcrypt.hash(body.password, saltOrRounds);
    await this.usersResository.insert({
      username: body.username,
      email: body.email,
      password: hash,
      isVerifyEmail: false,
      userRole: ROLE.USER,
      createAt: new Date(),
    });
  }

  async login(body: LoginDto): Promise<any> {
    const { username, password } = body;
    const user = await this.usersResository.findOne({
      where: { username: username },
    });
    if (!user) {
      throw new DataNotFoundException('user no found', 'USER_NOT_FOUND');
    }
    if (!(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException();
    }

    return this.getTokens(user.userId, user.username);
  }

  private async getTokens(userId: any, username: string) {
    const payload = { userId: userId, username: username };
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        { payload },
        { secret: 'test', expiresIn: '15m' },
      ),
      this.jwtService.signAsync(
        { payload },
        { secret: 'test', expiresIn: '1d' },
      ),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }
}
