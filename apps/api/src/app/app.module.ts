import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JsonApiModule } from 'json-api-nestjs';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Supply } from './supplies/supply.entity';
import { Recipe } from './recipes/recipe.entity';
import { RecipeIngredient } from './recipes/recipe-ingredient.entity';
import { Client } from './clients/client.entity';
import { Order } from './orders/order.entity';
import { OrderItem } from './orders/order-item.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('DATABASE_HOST'),
        port: configService.get('DATABASE_PORT'),
        username: configService.get('DATABASE_USERNAME'),
        password: configService.get('DATABASE_PASSWORD'),
        database: configService.get('DATABASE_NAME'),
        entities: [Supply, Recipe, RecipeIngredient, Client, Order, OrderItem],
        synchronize: true,
      })
    }),
    JsonApiModule.forRoot({
      entities: [Supply, Recipe, RecipeIngredient, Client, Order, OrderItem],
      options: {
        requiredSelectField: false,
        debug: true
      }
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
