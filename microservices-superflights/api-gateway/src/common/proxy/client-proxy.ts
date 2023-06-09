import { Injectable } from "@nestjs/common";
import {ConfigService} from "@nestjs/config"
import { ClientProxy, ClientProxyFactory, Transport } from "@nestjs/microservices";
import { RabbitMQ } from "src/common/constants/constants";
@Injectable()
export class ClientProxySuperFlights{
    constructor(private readonly config:ConfigService){}

    clientProxyUsers():ClientProxy{
        return ClientProxyFactory.create({
            transport:Transport.RMQ,
            options:{
                urls:this.config.get('AMQP_URL'),
                queue: RabbitMQ.userQueue
            }
        });
    }

    clientProxyPassengers(): ClientProxy {
        return ClientProxyFactory.create({
            transport: Transport.RMQ,
            options: {
                urls: this.config.get('AMQP_URL'),
                queue: RabbitMQ.passengerQueue
            }
        });
    }

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