import { Controller, Get, Post, Req, Res, Param, Body} from '@nestjs/common';
import * as _  from 'underscore';
import { from } from 'rxjs';
import { OrdersService } from './orders.service';
import { status_code } from '../../common/config/status_code'
import { CreateOrderDto } from './orders.dto';


@Controller()
export class OrdersController {
    constructor(
        private readonly OrdersService : OrdersService,
    ){}

    @Get('/getallorder')
    async getallorder(@Res() res): Promise<Object>{
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
        return res.send(response);
    }

    @Get('/getorderbyid/:id')
    async getorderbyid(@Param('id') id: string , @Res() res): Promise<Object>{
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
        return res.send(response); 
    }

    @Get('/getdata')
    async getdatafromapi(@Res() res): Promise<Object>{
        let response: Object = {};

        let result_data: Object = await this.OrdersService.getrecordfromapi();

        if(!_.isEmpty(result_data)){
            response = status_code.success;
            response["data"] = result_data;
        }else{
            response = status_code.no_results;
            response["data"] = [];
        }
        return res.send(response);
    }
    
    @Post('/createorder')
    async createorder(@Res() res , @Body() CreateOrderDto: CreateOrderDto): Promise<Object>{
        let response: Object = {};
        
        if(!CreateOrderDto.is_iwt || CreateOrderDto.is_iwt != "") {
            CreateOrderDto.is_iwt = '1';
        }

        if(CreateOrderDto.is_iwt == '1'){
            if(_.isObject(CreateOrderDto) && CreateOrderDto.seller_id != '' && CreateOrderDto.receiver_id != ''){
                let order_data: Object = await this.OrdersService.createorder(CreateOrderDto);
                if(_.isObject(order_data) && order_data["order_id"] != ''){
                    response = status_code.success;
                    response["order_id"] = order_data["order_id"];
                }else{
                    response = status_code.fatal_error;
                    response["order_id"] = "";
                }
            }else{
                response = status_code.invalid_input;
                response["order_id"] = "";
            }
        }
        
        return res.send(response);
    }
}
