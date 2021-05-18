import { Controller, Get, Post, Req, Res, Param} from '@nestjs/common';
import * as _  from 'underscore';
import { from } from 'rxjs';
import { OrdersService } from './orders.service';
import { status_code } from '../../common/config/status_code'


@Controller()
export class OrdersController {
    constructor(
        private readonly OrdersService : OrdersService,
    ){}

    @Get('/getallorder')
    async getallorder(@Res() res){
        let response :Object = {};
        let input_param: Object = {}; 
        const order_data = await this.OrdersService.getAllOrders();
        if(!_.isEmpty(order_data)){
            response = status_code.success;
            response["data"] = order_data;
        }else{
            response = status_code.no_results;
            response["data"] = [];
        }
        res.send(response);
    }

    @Get('/getorderbyid/:id')
    async getorderbyid(@Param('id') id: string , @Res() res){
        let response: Object = {};
        let input_param: Object = {}; 
        if(id != ''){
            input_param["id"] = id;
            const order_data = await this.OrdersService.getAllOrders(input_param);
            if(!_.isEmpty(order_data)){
                response = status_code.success;
                response["data"] = order_data;
            }else{
                response = status_code.no_results;
                response["data"] = [];
            }
        }else{
            response = status_code.invalid_input;
        }
        res.send(response); 
    }

    @Get('/getdata')
    async getdatafromapi(){
        let response: Object = {};

        let result_data: Object = await this.OrdersService.getrecordfromapi();

        if(!_.isEmpty(result_data)){
            response = status_code.success;
            response["data"] = result_data;
        }else{
            response = status_code.no_results;
            response["data"] = [];
        }
    }
    // @Post()
    // async createOrder(){

    // }
}
