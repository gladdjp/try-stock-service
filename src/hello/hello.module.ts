import { Module } from '@nestjs/common';
import { HelloConsumer } from './kafka.consumer';

@Module({
  providers: [HelloConsumer],
})
export class HelloModule {}
