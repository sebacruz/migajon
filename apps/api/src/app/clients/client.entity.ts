import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Order } from '../orders/order.entity';

@Entity()
export class Client {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({
    nullable: false
  })
  name!: string;

  @Column({
    nullable: false
  })
  email!: string;

  @Column({
    nullable: false
  })
  phone!: string;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;

  @OneToMany(() => Order, (order) => order.client)
  orders!: Order[];
}
