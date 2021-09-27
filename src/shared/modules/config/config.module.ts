import { Module } from '@nestjs/common';
import { ConfigModule as ConfigurationModule } from '@nestjs/config';
import { config } from './config';

@Module({
  imports: [ConfigurationModule.forRoot({ load: [config], isGlobal: true })],
})
export class ConfigModule {}
