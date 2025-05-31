import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('periods')
export class Period {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 50 })
  period: string;

  @Column({ type: 'date' })
  startDate: Date;

  @Column({ type: 'date' })
  endDate: Date;

  @Column({ length: 100 })
  name: string;

  @Column({ type: 'text', nullable: true })
  description?: string;
}
