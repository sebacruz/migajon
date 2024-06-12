import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export enum SupplyType {
  FLOUR = 'FLOUR',
  EGG = 'EGG',
  FAT = 'FAT',
  YEAST = 'YEAST',
  SUGAR = 'SUGAR',
  SALT = 'SALT',
  MILK = 'MILK',
  WATER = 'WATER',
  BUTTER = 'BUTTER',
  MARGARINE = 'MARGARINE',
  OIL = 'OIL',
  COLORANT = 'COLORANT',
  ESSENCE = 'ESSENCE',
  FRUIT = 'FRUIT',
  CHOCOLATE = 'CHOCOLATE',
  NUTS = 'NUTS',
  SEEDS = 'SEEDS',
  OTHER = 'OTHER'
}

export enum UnitType {
  KG = 'KG',
  G = 'G',
  LITER = 'LITER',
  ML = 'ML',
  UNIT = 'UNIT',
  BOX = 'BOX',
  PACKAGE = 'PACKAGE'
}

@Entity()
export class Supply {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({
    type: 'enum',
    enum: SupplyType
  })
  type: SupplyType;

  @Column({
    type: 'enum',
    enum: UnitType
  })
  unit: UnitType;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
