import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { SignupDto } from './dto/signup.dto';
import { SigninDto } from './dto/signin.dto';

@Injectable()
export class AuthService {
  private readonly accessTtl = process.env.JWT_ACCESS_TTL || '15m';
  private readonly accessSecret = process.env.JWT_ACCESS_SECRET || 'dev_access_secret_change_me';

  constructor(private users: UsersService, private jwt: JwtService) {}

  async signup(dto: SignupDto) {
    const user = await this.users.create(dto.email.toLowerCase(), dto.name.trim(), dto.password);
    const accessToken = await this.signAccessToken(user._id.toString(), user.email);
    return { accessToken, user: this.users.sanitize(user) };
  }

  async signin(dto: SigninDto) {
    const user = await this.users.findByEmailOrThrow(dto.email.toLowerCase());
    const ok = await this.users.validatePassword(user, dto.password);
    if (!ok) throw new UnauthorizedException('Invalid credentials');
    const accessToken = await this.signAccessToken(user._id.toString(), user.email);
    return { accessToken, user: this.users.sanitize(user) };
  }

  async me(claims: { userId: string; email: string }) {
    return { email: claims.email };
  }

  private async signAccessToken(userId: string, email: string) {
    return this.jwt.signAsync(
      { sub: userId, email },
      { secret: this.accessSecret, expiresIn: this.accessTtl }
    );
  }
}
