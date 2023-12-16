import { AuthService } from './auth.service';
import { AuthDto } from './dto/Auth.dto';
import { SigninAuthDto } from './dto/Auth.signin.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signup(dto: AuthDto): Promise<{
        name: string;
        email: string;
        id: string;
        count: number;
    }>;
    signin(dto: SigninAuthDto): Promise<{
        access_token: string;
    }>;
}
