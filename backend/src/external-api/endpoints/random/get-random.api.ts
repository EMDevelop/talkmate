import { Injectable } from '@nestjs/common'
import { createReadStream } from 'fs'
import { HTTPWrapperService } from 'src/external-api/middleware/http-wrapper.service'

@Injectable()
export class GetRandomApi {
	constructor(private readonly httpService: HTTPWrapperService) {}

	async getRandom() {
		return await this.httpService.get(`https://www.boredapi.com/api/activity`)
	}

	testingDataStreaming() {
		return createReadStream('./speechFiles/responseCymraeg.mp3')
	}
}
