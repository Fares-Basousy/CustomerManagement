import { AuthService } from './auth.service';
import { AuthDto } from './dto/Auth.dto';
import { SigninAuthDto } from './dto/Auth.signin.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signup(dto: AuthDto): Promise<{
        id: string;
        name: string;
        email: string;
        count: number;
    }>;
    signin(dto: SigninAuthDto): Promise<{
        access_token: string;
    }>;
}
