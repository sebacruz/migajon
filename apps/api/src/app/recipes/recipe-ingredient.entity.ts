import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Unique,
  Column,
} from 'typeorm';
import { Recipe } from './recipe.entity';
import { Supply } from '../supplies/supply.entity';

@Entity()
@Unique(['recipe', 'supply'])
export class RecipeIngredient {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Recipe, (recipe) => recipe.ingredients, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  recipe!: Recipe;

  @ManyToOne(() => Supply, {
    onDelete: 'CASCADE',
    nullable: false,
  })
  supply!: Supply;

  @Column({
    type: 'float',
    nullable: false,
    unsigned: true,
  })
  quantity!: number;
}
