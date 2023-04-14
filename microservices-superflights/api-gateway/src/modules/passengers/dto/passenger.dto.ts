import { IsNotEmpty, IsString } from "class-validator";

export class PassengerDto {
    @IsNotEmpty()
    @IsString()
    name:string;

    @IsNotEmpty()
    @IsString()
    email:string;
}
