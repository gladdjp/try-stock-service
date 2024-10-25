import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { Consumer, Kafka, KafkaMessage } from 'kafkajs';

export abstract class KafkaConsumer implements OnModuleInit, OnModuleDestroy{
  private readonly kafka: Kafka;
  private consumer: Consumer;

  abstract readonly consumerGroupName: string;
  abstract readonly consumerTopicName: string;
  abstract handler(message: KafkaMessage): void;

  constructor() {
    this.kafka = new Kafka({
      brokers: ['broker1:9092', 'broker2:9093'],
    });
  }

  async onModuleInit() {
    console.log(`${this.consumerGroupName}をkafkaから起動します`);

    this.consumer = this.kafka.consumer({
      groupId: this.consumerGroupName,
      heartbeatInterval: 3000,
      sessionTimeout: 50000,
      allowAutoTopicCreation: true,
    });

    await this.consumer.connect();
    await this.consumer.subscribe({
      topics: [this.consumerTopicName],
      fromBeginning: true,
    });
    await this.consumer.run({
      eachMessage: async ({ message }) => {
        this.handler(message);
      },
    });
  }

  async onModuleDestroy() {
    console.log(`${this.consumerGroupName}をkafkaから切断します`);
    await this.consumer.disconnect();
  }
}

@Injectable()
export class HelloConsumer extends KafkaConsumer {
  readonly consumerGroupName: string;
  readonly consumerTopicName: string;

  public constructor() {
    super();
    this.consumerGroupName = 'stack-service-consumer-group';
    this.consumerTopicName = 'added-to-cart';
  }

  handler(message: KafkaMessage): void {
    console.log('Message recieved!');
    console.log(message);
  }
}
