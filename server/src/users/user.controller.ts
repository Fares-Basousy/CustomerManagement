import {  Body, Controller, Delete, Get, Param, Post, Put, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from './user.service';
import { OpDTO } from './dto/opdto';
import { CustomerDTO } from './dto/customerdto';
import { Customer } from '@prisma/client';

@Controller('user')
export class UserController {
    constructor (private userService: UserService){}
       
    
    @Post('add')
    add(@Body() dto:CustomerDTO){
        return this.userService.add(dto)
    }
    
    @Delete(':userid/:id')
    delete(@Param('id') id: string,@Param('userid') userId: string){
        return this.userService.delete(userId,id)
    }
    
    @Put('edit')
    modify( @Body() newData: CustomerDTO){
       return this.userService.modify(newData)
    }
    
    @Get(':id/:page')
    getall(@Param('id') id :string,@Param('page') page :number){
        return this.userService.getall(id,page)
    }
    
    @Get('search/:page/:userid/:query?/')
    lookup(userid:string , @Param('query') query?: string){
        return this.userService.lookup(userid,query)
    }
}