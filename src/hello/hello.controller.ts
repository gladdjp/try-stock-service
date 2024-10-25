import { Controller } from '@nestjs/common';
import {
  Ctx,
  KafkaContext,
  MessagePattern,
  Payload,
} from '@nestjs/microservices';
import { KafkaMessage } from 'kafkajs';

@Controller()
export class HelloController {
  @MessagePattern('added-to-cart')
  consumeAddedToCartMessage(
    @Payload() message: KafkaMessage,
    @Ctx() context: KafkaContext,
  ) {
    const mess = context.getMessage();
    const response =
      `Receiving a new message from: added-to-cart: ` +
      JSON.stringify(mess.value);
    console.log(response);
    return response;
  }
}
