import { Module } from '@nestjs/common';
import { HelloController } from './hello.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'stock_service_consumer',
        transport: Transport.KAFKA,
        options: {
          client: {
            clientId: 'stock_service_consumer_service',
            brokers: ['broker1:9092', 'broker2:9093'],
          },
          consumer: {
            groupId: 'stock-service-consumer',
          },
        },
      },
    ]),
  ],
  controllers: [HelloController],
  providers: [],
})
export class HelloModule {}
