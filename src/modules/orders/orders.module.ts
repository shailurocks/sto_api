import { Module , HttpModule} from '@nestjs/common';
import { DbServiceService } from '../db-service/db-service.service';
import { ApiService } from '../shared/http/http.service';
import { DatabaseModule } from '../../common/database/database.module';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';

@Module({
  imports: [HttpModule , DatabaseModule],
  controllers: [OrdersController],
  providers: [OrdersService , DbServiceService , ApiService]
})
export class OrdersModule {}
