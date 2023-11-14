import { Injectable } from '@nestjs/common'
import { HTTPWrapperService } from 'src/external-api/middleware/http-wrapper.service'

@Injectable()
export class GetRandomApi {
	constructor(private readonly httpService: HTTPWrapperService) {}

	async getRandom() {
		return await this.httpService.get(`https://www.boredapi.com/api/activity`)
	}
}
