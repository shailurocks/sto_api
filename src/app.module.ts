import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './common/database/database.module';
import { DbServiceService } from './modules/db-service/db-service.service';

@Module({
  imports: [DatabaseModule],
  controllers: [AppController],
  providers: [AppService, DbServiceService],
})
export class AppModule {}
