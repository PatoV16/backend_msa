import { IsString, IsDateString, IsOptional, Length } from 'class-validator';

export class CreatePeriodDto {
  @IsString()
  @Length(1, 50)
  period: string;

  @IsDateString()
  startDate: string;

  @IsDateString()
  endDate: string;

  @IsString()
  @Length(1, 100)
  name: string;

  @IsOptional()
  @IsString()
  description?: string;
}
