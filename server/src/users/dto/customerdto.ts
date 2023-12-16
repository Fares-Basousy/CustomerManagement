import {IsEmail, IsNotEmpty} from "class-validator" 

export class CustomerDTO {
  
   @IsNotEmpty()
    name : string

    @IsNotEmpty()
    id? : string

    @IsNotEmpty()
    status? : string = 'active'

    @IsNotEmpty()
    gender  :string
   
    @IsNotEmpty()
    @IsEmail()
    email  : string 
   
    @IsNotEmpty()
    phone   :string  
    
    @IsNotEmpty()
    city?    :string = ''
    
    @IsNotEmpty()
    country? :string = ''
   
    @IsNotEmpty()
    note?   :string = ''

    @IsNotEmpty()
    address? :string = ''

    @IsNotEmpty()
    userId  :string
    }  