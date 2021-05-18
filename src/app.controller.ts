import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { DbServiceService } from './modules/db-service/db-service.service';



@Controller()
export class AppController {
  
  constructor(
              private readonly appService: AppService,
              private readonly DbServiceService : DbServiceService,
            ) {}

  @Get()
  async getHello() {

    let query:string = "SELECT id from `procurement_po` limit 1";
    let queryParams :Object = {};
    
    const dbResults = await this.DbServiceService.getRecordFromDb(query, queryParams);
    console.log(dbResults , "dbResults");
    //return this.appService.getHello();
  }
  
}
