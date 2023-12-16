import { Injectable, ForbiddenException} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CustomerDTO } from './dto/customerdto';
  
@Injectable()
export class UserService {
    constructor(private prisma:PrismaService
    ) {}
    
   async add(customer:CustomerDTO){
    
    const exist = await this.prisma.customer.findFirst({
      where:{
        OR:[
          {email:customer.email.toLocaleLowerCase()},
          {phone:customer.phone}
          ]
      }})
      if(exist !=null)
        throw new ForbiddenException('This customer is already registered')

    const createdCustomer =  await this.prisma.customer.create({
      data:{
        name: customer.name.toLocaleLowerCase(),
        email: customer.email.toLocaleLowerCase(),
        phone : customer.phone,
        gender : customer.gender,
        userId : customer.userId,
        status: customer.status,
        note : customer.note,
        country : customer.country,
        city : customer.city,
        address: customer.address,  
          },
  });
  await this.prisma.user.update({
    where:{
      id:customer.userId
    },
    data:{
      count:{
        increment:1
      }}})
  return createdCustomer;
   
   }

   async delete(userId:string,id:string){// add userid too
    try{ await this.prisma.customer.delete({where:{
      id: id,
      userId:userId
    }})}
    catch(error){     
       throw new ForbiddenException('This customer does not exist')
   }

    await this.prisma.user.update({
      where:{
        id:userId
      },
      data:{
        count:{
          decrement:1
        }}})
    return 
   }

   async modify(newData:CustomerDTO){ //add user idd too
    const modified = await this.prisma.customer.update({
      where:{
        id: newData.id,
      userId:newData.userId},
      data:newData
      })
    return modified
   }

   async getall(id:string,page:number){
    const customers = await this.prisma.customer.findMany({
      skip:page*10,
      take:10,
      where:{userId:id},
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
        
      }})
    const count = await this.prisma.user.findUnique({where:{id:id},select:{count:true}})
    return {customer:customers,count:count.count}
   }

   async lookup(userId:string,query:any,){
    const results = this.prisma.customer.findMany({
      
      where: {
        userId: userId,
        OR:[
            {id:query},
            {email:{search : query?query.toLocaleLowerCase():null}},
            {name:{search : query?query?.toLocaleLowerCase():null}},
            {phone:{search : query?query:null}}
        ]
      },
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
      }
    })
    return results

   }

 
}
