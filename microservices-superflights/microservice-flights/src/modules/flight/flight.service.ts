import { HttpStatus, Injectable } from '@nestjs/common';
import { flightDto } from './dto/flight.dto';
import { InjectModel } from '@nestjs/mongoose';
import { FLIGHT, PASSENGER } from 'src/common/models/models';
import { Model } from 'mongoose';
import { IFlight } from 'src/common/interfaces/flight.interface';
import { HttpException } from '@nestjs/common';
import { IPassenger } from 'src/common/interfaces/passenger.interface';

@Injectable()
export class FlightService {

  constructor(
    @InjectModel(FLIGHT.name)private readonly model:Model<IFlight>,
    @InjectModel(PASSENGER.name) private readonly modelPassenger: Model<IPassenger>
  ){}
  async create(flightDto: flightDto):Promise<IFlight>{
    const newFlight = new this.model(flightDto)
    return await newFlight.save()
  }

  async findAll():Promise<IFlight[]> {
    return await this.model.find().populate('passengers')
  }

  async findById(id: string): Promise<IFlight>{
    return await this.model.findById(id).populate('passengers')
  }

  async update(id: string, flightDto: flightDto):Promise<IFlight>{
    return await this.model.findByIdAndUpdate(id,flightDto,{new:true})
  }

  async remove(id: string): Promise<Object>{
    await this.model.findByIdAndRemove(id)
    return {
      status:HttpStatus.OK,
      msg:'Deleted'
    }
  }
  async addPassenger(flightId:string,passengerId:string):Promise<IFlight>{
    const passenger = await this.modelPassenger.findById(passengerId)
    const flight = await this.model.findById(flightId)
    if(!passenger){
      throw new HttpException('passenger not found',HttpStatus.NOT_FOUND)
    }
    if (!flight){
      throw new HttpException('flight not found', HttpStatus.NOT_FOUND)
    }
    return await this.model.findByIdAndUpdate(flightId,{
      $addToSet: { passengers: passengerId }
    },{new:true})
    .populate('passengers')
  } 
}
