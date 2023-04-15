import { Injectable } from "@nestjs/common";
import {ConfigService} from "@nestjs/config"
import { ClientProxy, ClientProxyFactory, Transport } from "@nestjs/microservices";
import { RabbitMQ } from "src/common/constants/constants";
@Injectable()
export class ClientProxySuperFlights{
    constructor(private readonly config:ConfigService){}

    //TODO: CREAR LA CONEXION AL CLUSTER POR MEDIO QUEUE DEL USUARIO 
    clientProxyUsers():ClientProxy{
        return ClientProxyFactory.create({
            transport:Transport.RMQ,
            options:{
                urls:this.config.get('AMQP_URL'),
                queue: RabbitMQ.userQueue
            }
        });
    }

    //TODO: CREAR LA CONEXION AL CLUSTER POR MEDIO QUEUE DEL PASSENGER
    clientProxyPassengers(): ClientProxy {
        return ClientProxyFactory.create({
            transport: Transport.RMQ,
            options: {
                urls: this.config.get('AMQP_URL'),
                queue: RabbitMQ.passengerQueue
            }
        });
    }

    //TODO: CREAR LA CONEXION AL CLUSTER POR MEDIO QUEUE DEL FLIGHT 
    clientProxyFlights(): ClientProxy {
        return ClientProxyFactory.create({
            transport: Transport.RMQ,
            options: {
                urls: this.config.get('AMQP_URL'),
                queue: RabbitMQ.flightQueue
            }
        });
    }
}