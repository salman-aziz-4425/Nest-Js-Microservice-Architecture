import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ModelDefinition, MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      //  allow us to initialize these deps on application startup
      useFactory: (configService: ConfigService) => ({
        uri: configService.get('MONGODB_URI'),
      }),
      inject: [ConfigService], // deps neeed for useFactory CongifService comes with env variables
    }),
  ],
})
export class DatabaseModule {
  // we are just abstracting this schema initialization process away from implementation
  static forFeature(models: ModelDefinition[]) {
    return MongooseModule.forFeature(models);
  }
}
