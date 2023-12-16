import { ForbiddenException, Injectable } from '@nestjs/common';
import { AuthDto } from './dto/Auth.dto';
import * as argon from 'argon2';
import { ConfigService } from '@nestjs/config';
import { SigninAuthDto } from './dto/Auth.signin.dto';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(    
    private jwt: JwtService,
    private prisma:PrismaService,
    private config: ConfigService,
  ) {}

  async signup(dto: AuthDto) {
    const hash = await argon.hash(dto.password);
    const createdUser =  this.prisma.user.create({
      data:{
      name: dto.name.toLocaleLowerCase(),
      password: hash,
      email: dto.email.toLocaleLowerCase(),
    },
    select:{
      id:true,
      name:true,
      email:true,
      count:true
    }});
    return createdUser;
  }
  
  async signin(dto: SigninAuthDto): Promise<{ access_token: string }> {
    const user = await this.prisma.user.findUnique({where:{
      email: dto.email.toLocaleLowerCase(),}
    });
    if (user == null)
      throw new ForbiddenException('Credentionals incorrect');
    const ps = await argon.verify(user.password, dto.password);

    if (!ps) 
      throw new ForbiddenException('Incorrect password');
    
    return this.signinToken(user.id,user.email, user.name,user.count);
  }


  async signinToken(id: string, email:string,name: string,count:number) {
    const secret = this.config.get('jwtPass');
    const payloud = { sub: id,email, name,count};
    const token = await this.jwt.signAsync(payloud, {
      expiresIn: `1d`,
      secret: secret,
    });
    return { access_token: token };
  }
 
}
