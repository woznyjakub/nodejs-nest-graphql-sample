import { Controller, Get } from '@nestjs/common';

import { HelloWorldService } from './hello-world.service';

@Controller()
export class HelloWorldController {
  constructor(private readonly helloService: HelloWorldService) {}

  @Get()
  getHello(): string {
    return this.helloService.getHello();
  }
}
