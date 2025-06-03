import { Module, OnModuleInit } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST || 'localhost',
      port: process.env.DATABASE_PORT
        ? parseInt(process.env.DATABASE_PORT, 10)
        : 3306,
      username: 'root',
      password: 'root',
      database: 'nest-db',
      entities: ['dist/**/*.entity.js'],
      synchronize: false,
      logging: true,
    }),
    ProductsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements OnModuleInit {
  // configure(consumer: MiddlewareConsumer) {
  //   consumer.apply(LoggerMiddleware).forRoutes(ProductsController);
  // }
  constructor(private readonly dataSource: DataSource) {}
  async onModuleInit() {
    let retries = 5;
    while (retries > 0) {
      try {
        if (!this.dataSource.isInitialized) {
          await this.dataSource.initialize();
        }
        console.log('✅ Connected to MySQL');
        break;
      } catch (error) {
        console.error('❌ MySQL Connection Failed:', error);
        retries--;
        if (retries === 0) throw error;
        await new Promise((resolve) => setTimeout(resolve, 5000)); // Wait 5 seconds before retrying
      }
    }
  }
}
