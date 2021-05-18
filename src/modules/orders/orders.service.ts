import { Injectable , Inject } from '@nestjs/common';
import { from } from 'rxjs';
import * as _  from 'underscore';
import { DbServiceService } from '../db-service/db-service.service';
import { ApiService } from '../shared/http/http.service';

@Injectable()
export class OrdersService {
    constructor(
       private readonly DbServiceService : DbServiceService, 
       private readonly ApiService : ApiService, 
    ){}

    async getAllOrders(input_param?: any): Promise<Array<Object>>{
        let sql: string = '';
        
        if(!_.isEmpty(input_param) && input_param["id"] != ''){
            sql = "Select * from procurement_po";
            let where_cond = " where id="+input_param['id'];
            sql += where_cond;
        }else{
            sql = "Select * from procurement_po limit 5";
        }
        
        let order_data = await this.DbServiceService.getRecordFromDb(sql);
        return order_data;
    }

    async getrecordfromapi(): Promise<Object> {
        const api_url= process.env.API_URL+"/orders/getorderbyid/108315";
        try{
            let data: Object = await this.ApiService.getFromApi(api_url);
            return data;
        }catch(err){
            console.log(err);
            return [];
        }    
    }
}
