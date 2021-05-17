import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import {
  Sequelize,
  Model,
  ModelDefined,
  DataTypes,
  HasManyGetAssociationsMixin,
  HasManyAddAssociationMixin,
  HasManyHasAssociationMixin,
  Association,
  HasManyCountAssociationsMixin,
  HasManyCreateAssociationMixin,
  Optional,
  QueryTypes
} from "sequelize";


@Controller()
export class AppController {
  
  constructor(
              private readonly appService: AppService
            ) {}

  @Get()
  async getHello() {
    const db_connection = new Sequelize("mysql://web_user:36dXUwiaflxKKjposE90@10.140.0.95:3306/purplle_purplle2");
    
    let query:string = "SELECT id from `procurement_po` limit 1";
    let queryParams :Object = {};

    const dbResults = await db_connection.query(query, { type: QueryTypes.SELECT });
    //this.sequelizeInstance.query(query, { type: QueryTypes.SELECT, replacements:replacements });
    console.log(dbResults , "dbResults")
    //return this.appService.getHello();
  }
}
