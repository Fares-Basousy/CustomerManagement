  import { Test, TestingModule } from '@nestjs/testing';
  import { AuthService } from './auth.service';
  import { JwtModule, JwtService } from '@nestjs/jwt';
  import { AuthDto } from './dto/Auth.dto';
  import * as argon from 'argon2';
  import { SigninAuthDto } from './dto/Auth.signin.dto';
  import { PrismaModule } from '../prisma/prisma.module';
  import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../prisma/prisma.service';
  describe('AuthService', () => {
    let service: AuthService;
  
    const mockPrisma ={ user:{
      create: jest.fn(),
      findUnique: jest.fn(),
    }};
    beforeEach(async () => {
      const module: TestingModule = await Test.createTestingModule({
        providers: [AuthService,
         ConfigService, {provide:PrismaService,useValue:mockPrisma}],
          imports:[PrismaModule,JwtModule.register({})],}).compile();

      service = module.get<AuthService>(AuthService);
    });

    it('should be defined', () => {
      expect(service).toBeDefined();
    });
    
    it('should signup a user', async () => {
      const authDTO : AuthDto = {
        name: 'testuser',
        password: 'testpassword',
        email:  'test@user.com'
      }
      const user = {
        name: 'testuser',
        email:  'test@user.com'
      }

      jest.spyOn(mockPrisma.user, 'create').mockReturnValue(user);
      const result = await service.signup(authDTO)
      expect(mockPrisma.user.create).toHaveBeenCalled();
      expect(mockPrisma.user.create).toHaveBeenCalledWith({data:expect.objectContaining({name:authDTO.name,email:authDTO.email}),
        select:{
          count:true,
          id:true,
          name:true,
          email:true}
        })
      expect(result).toEqual(user)
    });
   

    it('should signin and return access token', async () => {
      const signinDTO: SigninAuthDto = 
      {
        email: 'test@user.com',
        password: 'testpassword'};
        const user= 
      { name:'test',
        email: 'test@user.com',
        id: '1',
        };

        jest.spyOn(mockPrisma.user, 'findUnique').mockReturnValue(user);
        jest.spyOn(argon, 'verify').mockReturnValue(Promise.resolve(true))
        const token = await service.signin(signinDTO)
        expect(mockPrisma.user.findUnique).toHaveBeenCalled();
        expect(mockPrisma.user.findUnique).toHaveBeenCalledWith({where:{email:signinDTO.email} })
        expect(token.access_token).toContain('ey');
    });
  });
