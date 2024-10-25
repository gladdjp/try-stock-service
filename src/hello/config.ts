import { KafkaOptions, Transport } from '@nestjs/microservices';

export const stockServiceConsumerGroupMicroserviceConfig: KafkaOptions = {
  transport: Transport.KAFKA,
  options: {
    client: {
      clientId: 'stock_service_consumer_service',
      brokers: ['broker1:9092', 'broker2:9093'],
    },
    consumer: {
      groupId: 'stock-service-consumer',
      allowAutoTopicCreation: true,
    },
  },
};
