import { Injectable , Inject} from '@nestjs/common';
import { QueryTypes } from 'sequelize';

@Injectable()
export class DbServiceService {
    constructor(
        @Inject('SEQUELIZE') private readonly sequelizeInstance,
    ) {}

    async getRecordFromDb(query: string, replacements?:Object): Promise<Array<Object>> {
        try{
            return await this.sequelizeInstance.query(query, { type: QueryTypes.SELECT, replacements:replacements });
        }catch(err){
            console.error(err);
            return [];
        }
    }
}
