import { Module } from '@nestjs/common';

import { StarWarsCommonService } from './star-wars-common.service';

@Module({
  providers: [StarWarsCommonService],
  exports: [StarWarsCommonService],
})
export class StarWarsCommonModule {}
