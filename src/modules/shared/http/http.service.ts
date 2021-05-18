import {
    HttpException,
    HttpService,
    HttpStatus,
    Injectable,
} from '@nestjs/common';
import { AxiosRequestConfig, AxiosResponse } from 'axios';
import * as _ from 'underscore';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs/operators';

@Injectable()
export class ApiService {
    constructor(
        private httpService: HttpService,
    ) {}

    ping(): Observable<AxiosResponse<any>> {
        return this.httpService.get('https://www.google.com');
    }

    getFromApi(url: string, paramsObj?: Object, headersObj?: Object,): Promise<AxiosResponse<any>> {
        let config: AxiosRequestConfig = {};
        if (!_.isEmpty(headersObj)) {
            // headers = Object.assign(headers, headersObj);
            config.headers = headersObj;
        }
        if (!_.isEmpty(paramsObj)) {
            config.params = paramsObj;
        }

        return this.httpService
            .get(url, config)
            .toPromise()
            .then(resp => resp.data)
            .catch(err => {
                this.handleErr(err);
            });
    }

    postToAPI(url: string, paramsObj?: any, headersObj?: any, postData?: any): Promise<AxiosResponse<any>> {
        let config: AxiosRequestConfig = {};
        if (!_.isEmpty(headersObj)) {
            // headers = Object.assign(headers, headersObj);
            config.headers = headersObj;
        }
        if (!_.isEmpty(paramsObj)) {
            config.params = paramsObj;
        }
        if (!_.isEmpty(postData)) {
            config.data = postData;
        }
        return this.httpService
            .post(url, config)
            .toPromise()
            .then(resp => resp.data)
            .catch(err => {
                this.handleErr(err);
            });
    }

    handleErr(err: any) {
        // console.error("Http Service error : ", JSON.stringify(err));
        throw new HttpException(
            {
                message : 'Something went wrong',
                status : HttpStatus.OK,
                description : JSON.stringify(err),
            },
            HttpStatus.OK,
        );
    }
}
