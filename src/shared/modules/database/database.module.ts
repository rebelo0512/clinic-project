import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    // TypeOrmModule.forRootAsync({
    //   inject: [ConfigService],
    //   useFactory: (configService: ConfigService) => ({
    //     type: 'mysql',
    //     host: configService.get<string>('DB_HOST'),
    //     port: configService.get<number>('DB_PORT'),
    //     username: configService.get<string>('DB_USERNAME'),
    //     password: configService.get<string>('DB_PASSWORD'),
    //     database: configService.get<string>('DB_DATABASE'),
    //     entities: ['dist/**/*.entity.js'],
    //     cli: {
    //       entitiesDir: 'src/**/*.entity.ts',
    //     },
    //   }),
    // }),
    TypeOrmModule.forRoot(),
  ],
})
export class DatabaseModule {}
