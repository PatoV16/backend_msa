import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Period } from './entities/period.entity';
import { PeriodsService } from './periods.service';
import { PeriodsController } from './periods.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Period])],
  providers: [PeriodsService],
  controllers: [PeriodsController],
  exports: [PeriodsService],
})
export class PeriodsModule {}
