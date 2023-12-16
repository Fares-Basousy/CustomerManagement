import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { PrismaService } from '../prisma/prisma.service';
import { PrismaModule } from '../prisma/prisma.module';
import { CustomerDTO } from './dto/customerdto';

describe('UserService', () => {
  let service: UserService;


  const customers = [
    {
      name: 'john doe',
      email: 'john.doe@example.com',
      phone: '123-456-7890',
      gender: 'male',
      userId: 'user1',
      id: '1',
      status: 'active',
      notes:  'bruh',
      country: 'USA',
      city: 'New York',
      address: '123 Main St',
    },
    
      {
      name: 'jane smith',
      email: 'jane.smith@example.com',
      phone: '987-654-3210',
      gender: 'female',
      userId: 'user1',
      id: '2',
      status: 'inactive',
      notes: 'Note3',
      country: 'Canada',
      city: 'Toronto',
      address: '456 Oak St',
    },
      {
      name: 'alice johnson',
      email: 'alice.johnson@example.com',
      phone: '555-123-4567',
      gender: 'female',
      userId: 'user1',
      id: '3',
      status: 'active',
      notes: 'lol',
      country: 'UK',
      city: 'London',
      address: '789 Oak St',
    },
    
      {
      name: 'bob anderson',
      email: 'bob.anderson@example.com',
      phone: '777-999-8888',
      gender: 'male',
      userId: 'user2',
      id: '4',
      status: 'inactive',
      notes: 'wierd one',
      country: 'Australia',
      city: 'Sydney',
      address: '101 Pine St',
    },
    {
      name: 'emma miller',
      email: 'emma.miller@example.com',
      phone: '111-222-3333',
      gender: 'female',
      userId: 'user2',
      id: '5',
      status: 'active',
      notes: 'Note 10',
      country: 'France',
      city: 'Paris',
      address: '202 Elm St',
    }
    
  ]

  const mockPrisma ={ customer:{
    create: jest.fn(),
    findFirst: jest.fn(),
    delete: jest.fn(),
    update: jest.fn(),
    findMany:jest.fn()
  },
user:{
  update: jest.fn()
}};
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserService,{provide:PrismaService,useValue:mockPrisma}],
      imports:[PrismaModule]
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('a customer should be added',async ()=>{
    const createUserDto :CustomerDTO = {
      gender: 'male',
      userId:'user1',
      phone: '1313113',
      name: 'chadwick',
      email: 'chadwickboseman@email.com',
      city:null,     
      country :null ,
      note   :null  ,
      address :null ,
      status :'active' 
    } ;

    const user = {
      gender: 'male',
      id: '1',
      userId:'user1',
      phone: '1313113',
      name: 'chadwick',
      email: 'chadwickboseman@email.com',
      status: 'active',        
      city:null,     
      country :null ,
      note   :null  ,
      address :null ,
     } 
    jest.spyOn(mockPrisma.customer, 'create').mockReturnValue(user);
   const result = await service.add(createUserDto)
   expect(mockPrisma.customer.create).toHaveBeenCalled();
   expect(mockPrisma.customer.create).toHaveBeenCalledWith({data:createUserDto});
   expect(result).toEqual(user);

  })
  it('a customer should be modifed',async ()=>{
    const userId = 'user1'
    const user = {
      gender: 'male',
      id: `1`,
      userId:'user1',
      phone: '1313113',
      name: 'Chadwick',
      email: 'chadwickboseman@email.com',
    }
    const NewUser = {
      gender: 'male',
      id: `1`,
      userId:'user1',
      phone: '1313113',
      name: 'Chadwick',
      email: 'chadwickboseman@email.com',
    } 
    jest.spyOn(mockPrisma.customer, 'update').mockReturnValue(user);
   const result = await service.modify(NewUser)
   expect(mockPrisma.customer.update).toHaveBeenCalled();
   expect(mockPrisma.customer.update).toHaveBeenCalledWith({where:{userId:userId,id:user.id},data:NewUser});
   expect(result).toEqual(user);

  })
  it('a customer should be deleted',async ()=>{
    const id = '1';
    const userId = 'user1'
    const user = {
      userId : 'user1',
      id: '1',
      firstname: 'Chadwick',
      lastname: 'Boseman',
      email: 'chadwickboseman@email.com',
    };

    jest.spyOn(mockPrisma.customer, 'delete').mockReturnValue(user);

    //act
    await service.delete(userId,id);
    expect(mockPrisma.customer.delete).toHaveBeenCalled();
    expect(mockPrisma.customer.delete).toHaveBeenCalledWith({where:{userId:userId,id:id}});
  });

 
  it('specific customers should be fetched',async ()=>{
    const page = 0
    const userId = 'user1'
    let query = 'sas'
    jest.spyOn(mockPrisma.customer, 'findMany').mockReturnValue([customers[0],customers[1],customers[2]]);

    //act
    const result = await service.lookup(userId,query);
    expect(result).toEqual([customers[0],customers[1],customers[2]]);
    expect(mockPrisma.customer.findMany).toHaveBeenCalled();
    expect(mockPrisma.customer.findMany).toHaveBeenCalledWith({
      where: {userId:userId,OR:[ {id:query},{email:{search : query}},{name:{search : query}},{phone:{search : query} }]},
      select:{
        name:true,
        gender:true,
        status:true,
        id:true,
        email:true,
        phone:true,
        country:true,
        city:true,
        address:true,
        note:true,
        
      }  });
  });

 
  
});
