import { Module } from '@nestjs/common'
import { ExternalAPIService } from './external-api.service'
import { ExternalController as ExternalAPIController } from './external-api.controller'
import axios from 'axios'
import { AxiosInstanceToken, HTTPWrapperService } from './middleware/http-wrapper.service'
import { GetRandomApi } from './endpoints/random/get-random.api'
import { OpenAiApi } from './endpoints/random/open-ai.api'

const endpoints = [GetRandomApi, OpenAiApi]
@Module({
	providers: [
		ExternalAPIService,
		{ provide: AxiosInstanceToken, useValue: axios.create() },
		...endpoints,
		HTTPWrapperService
	],
	controllers: [ExternalAPIController]
})
export class ExternalAPIModule {}
