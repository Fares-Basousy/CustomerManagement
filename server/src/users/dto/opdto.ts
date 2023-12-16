import {IsNotEmpty} from "class-validator" 

export class OpDTO {
  
   @IsNotEmpty()
    field : string

    newValue: string


}