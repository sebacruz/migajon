import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { RecipeIngredient } from '../recipes/recipe-ingredient.entity';
import { UnitType } from '../supplies/supply.entity';

@Entity()
export class Recipe {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    nullable: false,
  })
  name!: string;

  @Column({
    type: 'enum',
    enum: UnitType,
    nullable: false,
  })
  unit!: UnitType;

  @Column({
    type: 'float',
    nullable: false,
    unsigned: true
  })
  price!: number;

  @Column({
    type: 'float',
    nullable: false,
    default: 0,
    unsigned: true
  })
  resultingQuantity!: number;

  @OneToMany(() => RecipeIngredient, (ingredient) => ingredient.recipe, {
    cascade: true,
  })
  ingredients!: RecipeIngredient[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
