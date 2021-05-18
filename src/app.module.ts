import { Module , HttpModule} from '@nestjs/common';
import { routes } from "./app.routes";
import { RouterModule } from 'nest-router';
import { from } from 'rxjs';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from './common/database/database.module';
import { DbServiceService } from './modules/db-service/db-service.service';
import { ApiService } from './modules/shared/http/http.service';
import { OrdersModule } from './modules/orders/orders.module';



@Module({
  imports: [
    HttpModule,
    DatabaseModule , 
    OrdersModule,
    RouterModule.forRoutes(routes),
  ],
  controllers: [AppController],
  providers: [AppService, DbServiceService, ApiService],
})
export class AppModule {}
