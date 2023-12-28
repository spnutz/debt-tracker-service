import * as bcrypt from 'bcrypt';
import { HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginDto, RegisterDto } from './dto/auth.dto';
import { BaseException } from 'src/common/exceptions/base.exception';
import { ROLE } from 'src/common/constant/enum';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Users } from 'src/common/entities/users.entity';
import { Repository } from 'typeorm';

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
      throw new BaseException(
        'This email already exists.',
        HttpStatus.CONFLICT,
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

  // async login(body: LoginDto): Promise<any> {
  //   const { username, password } = body;
  //   const user = await this.usersModel.findOne({ username }).exec();
  //   if (!user) {
  //     throw new BaseException('user no found', HttpStatus.NOT_FOUND);
  //   }
  //   if (!(await bcrypt.compare(password, user.password))) {
  //     throw new UnauthorizedException();
  //   }

  //   return this.getTokens(user._id, user.username);
  // }

  // private async getTokens(userId: any, username: string) {
  //   const payload = { sub: userId, username: username };
  //   const [accessToken, refreshToken] = await Promise.all([
  //     this.jwtService.signAsync(
  //       { payload },
  //       { secret: 'test', expiresIn: '15m' },
  //     ),
  //     this.jwtService.signAsync(
  //       { payload },
  //       { secret: 'test', expiresIn: '1d' },
  //     ),
  //   ]);

  //   return {
  //     accessToken,
  //     refreshToken,
  //   };
  // }
}
