import { UserService } from './user.service';
import { CustomerDTO } from './dto/customerdto';
export declare class UserController {
    private userService;
    constructor(userService: UserService);
    add(dto: CustomerDTO): Promise<{
        id: string;
        name: string;
        status: string;
        gender: string;
        email: string;
        phone: string;
        city: string;
        country: string;
        note: string;
        address: string;
        userId: string;
    }>;
    delete(id: string, userId: string): Promise<{
        statusCode: number;
        status: string;
    }>;
    modify(newData: CustomerDTO): Promise<{
        id: string;
        name: string;
        status: string;
        gender: string;
        email: string;
        phone: string;
        city: string;
        country: string;
        note: string;
        address: string;
        userId: string;
    }>;
    getall(id: string, page: number): Promise<{
        customer: {
            id: string;
            name: string;
            status: string;
            gender: string;
            email: string;
            phone: string;
            city: string;
            country: string;
            note: string;
            address: string;
        }[];
        count: number;
    }>;
    lookup(userid: string, query?: string): Promise<any[]>;
}
