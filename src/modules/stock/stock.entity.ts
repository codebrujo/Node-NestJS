import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { StockDto } from './dto/stock.dto';

@Entity({ name: 'stocks' })
export class StockEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 255, unique: true, nullable: false })
  ticker: string;

  @Column({ length: 255, nullable: true })
  title: string;

  @Column({ type: 'decimal', nullable: true })
  price: number;

  @CreateDateColumn({ name: 'created_at' })
  created_at: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updated_at: Date;

  dtoClass = StockDto;
}
