import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { Order } from './order.entity';
import { Recipe } from '../recipes/recipe.entity';

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn()
  id!: number;

  @ManyToOne(() => Order, (order) => order.items, {
    nullable: false
  })
  order!: Order;

  @ManyToOne(() => Recipe, {
    nullable: false
  })
  recipe!: Recipe;

  @Column({
    type: 'decimal',
    nullable: false,
    unsigned: true
  })
  quantity!: number;
}
