import { Module } from '@nestjs/common'
import { ExternalAPIService } from './external-api.service'
import { ExternalController as ExternalAPIController } from './external-api.controller'
import axios from 'axios'
import { AxiosInstanceToken, HTTPWrapperService } from './middleware/http-wrapper.service'
import { GetRandomApi } from './endpoints/random/get-random.api'

const endpoints = [GetRandomApi]
@Module({
	providers: [ExternalAPIService, { provide: AxiosInstanceToken, useValue: axios.create() }, ...endpoints, HTTPWrapperService],
	controllers: [ExternalAPIController]
})
export class ExternalAPIModule {}
