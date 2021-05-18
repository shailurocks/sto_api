import { Injectable , Inject } from '@nestjs/common';
import { from } from 'rxjs';
import { databaseProviders } from 'src/common/database/database.providers';
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

    async createorder(args: any):Promise<Object>{
        let data: Object = {};
        //table name
        let table_name: string = 'procurement_po';

        let sql: string = "insert into "+table_name;

        //get column name
        let columns: string[] = Object.keys(args);
        let insert_column_name: string = '`'+columns.join('`, `')+'`';
        let insert_bind_param: string = ':'+columns.join(',:');

        //create queryParams value array
        let queryParams: Object = {};
        for (let [key, value] of Object.entries(args)) {
            queryParams[key] = value;
        }

        sql += "("+insert_column_name+") values ("+insert_bind_param+")";

        let order_data: Object = await this.DbServiceService.insertRecordIntoDb(sql , queryParams);
        if(!_.isEmpty(order_data)){
            data["order_id"] = order_data[0];
        }else{
            data["order_id"] = "";
        }
        
        return data;
    }
}
