import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: 'mongodb+srv://ikalumba221:Fb3LUGsfNAkK1ag2@rls.lm131.mongodb.net/',
      }),
    }),
  ],
})
export class DatabaseModule {}
