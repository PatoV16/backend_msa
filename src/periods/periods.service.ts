import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Period } from './entities/period.entity';
import { CreatePeriodDto } from './dto/create-period.dto';
import { UpdatePeriodDto } from './dto/update-period.dto';

@Injectable()
export class PeriodsService {
  private readonly logger = new Logger(PeriodsService.name);

  constructor(
    @InjectRepository(Period)
    private readonly periodRepository: Repository<Period>,
  ) {}

  async create(createPeriodDto: CreatePeriodDto): Promise<Period> {
    this.logger.log(`Creating period with data: ${JSON.stringify(createPeriodDto)}`);

    const period = this.periodRepository.create(createPeriodDto);
    const saved = await this.periodRepository.save(period);

    this.logger.log(`Period created with id: ${saved.id}`);
    return saved;
  }

  findAll(): Promise<Period[]> {
    this.logger.log('Fetching all periods');
    return this.periodRepository.find();
  }

  async findOne(id: number): Promise<Period> {
    this.logger.log(`Fetching period with id: ${id}`);
    const period = await this.periodRepository.findOneBy({ id });
    if (!period) {
      this.logger.warn(`Period with id ${id} not found`);
      throw new NotFoundException(`Period with id ${id} not found`);
    }
    return period;
  }

  async update(id: number, updatePeriodDto: UpdatePeriodDto): Promise<Period> {
    this.logger.log(`Updating period id ${id} with data: ${JSON.stringify(updatePeriodDto)}`);

    const period = await this.periodRepository.preload({
      id,
      ...updatePeriodDto,
    });

    if (!period) {
      this.logger.warn(`Period with id ${id} not found for update`);
      throw new NotFoundException(`Period with id ${id} not found`);
    }

    const updated = await this.periodRepository.save(period);
    this.logger.log(`Period updated with id: ${updated.id}`);
    return updated;
  }

  async remove(id: number): Promise<{ message: string }> {
    this.logger.log(`Removing period with id: ${id}`);

    const result = await this.periodRepository.delete(id);

    if (result.affected === 0) {
      this.logger.warn(`Period with id ${id} not found for removal`);
      throw new NotFoundException(`Period with id ${id} not found`);
    }

    this.logger.log(`Period with id ${id} removed`);
    return { message: 'Period removed successfully' };
  }
}
