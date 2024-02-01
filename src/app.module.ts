import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { RolesModule } from './roles/roles.module';
import { InventoryModule } from './inventory/inventory.module';
import { NavigationModule } from './navigation/navigation.module';
import { SettingsModule } from './settings/settings.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URL, { dbName: process.env.MONGO_DB, appName: process.env.MONGO_DB }),
    UsersModule,
    AuthModule,
    ProductsModule,
    RolesModule,
    InventoryModule,
    NavigationModule,
    SettingsModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
