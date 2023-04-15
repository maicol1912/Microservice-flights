import { Controller} from '@nestjs/common';
import { PassengerService } from './passenger.service';
import { PassengerDto } from './dto/passenger.dto';
import { MessagePattern, Payload } from "@nestjs/microservices"
import { PassengerMSG } from 'src/common/constants/constants';
@Controller('api/v2/passenger')
export class PassengerController {
  constructor(private readonly passengerService: PassengerService) {}

  @MessagePattern(PassengerMSG.CREATE)
  create(@Payload() passengerDto: PassengerDto) {
    return this.passengerService.create(passengerDto);
  }

  @MessagePattern(PassengerMSG.FIND_ALL)
  findAll(){
    return this.passengerService.findAll()
  }

  @MessagePattern(PassengerMSG.FIND_ONE)
  findOne(@Payload()id:string){
    return this.passengerService.findOne(id)
  }

  @MessagePattern(PassengerMSG.UPDATE)
  updateUser(@Payload() payload:any) {
    
    return this.passengerService.update(payload.id, payload.passengerDto)
  }

  @MessagePattern(PassengerMSG.DELETE)
  deleteUser(@Payload() id: string) {
    return this.passengerService.delete(id)
  }
}
