import { PrismaService } from '../prisma/prisma.service';
import { CustomerDTO } from './dto/customerdto';
export declare class UserService {
    private prisma;
    constructor(prisma: PrismaService);
    add(customer: CustomerDTO): Promise<{
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
    delete(userId: string, id: string): Promise<{
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
    lookup(userId: string, query: any): Promise<any[]>;
}
