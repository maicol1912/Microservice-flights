import { Global, Module } from '@nestjs/common';
import { ClientProxySuperFlights } from './client-proxy';
@Global()
@Module({
    imports:[ProxyModule],
    providers: [ClientProxySuperFlights],
    exports: [ClientProxySuperFlights]
})
export class ProxyModule {}


