import { Routes } from "nest-router";
import { from } from "rxjs";
import { OrdersModule } from './modules/orders/orders.module';

export const routes: Routes  = [
    {
        path: '/sto/v1/',
        children:[
            {
              path: '/orders/',
              module: OrdersModule,
            },
        ],
    }
]