import { Injectable , Inject} from '@nestjs/common';
import { QueryTypes } from 'sequelize';

@Injectable()
export class DbServiceService {
    constructor(
        @Inject('SEQUELIZE_MASTER') private readonly sequelizeInstance,
    ) {}

    async getRecordFromDb(query: string, replacements?:Object): Promise<Array<Object>> {
        try{
            return await this.sequelizeInstance.query(query, { type: QueryTypes.SELECT, replacements:replacements });
        }catch(err){
            console.error(err);
            return [];
        }
    }

    async insertRecordIntoDb(query: string, replacements?:Object): Promise<Array<Object>> {
        try{
            return await this.sequelizeInstance.query(query, { type: QueryTypes.INSERT, replacements:replacements });
        }catch(err){
            console.error(err);
            return [];
        }
    }
}
