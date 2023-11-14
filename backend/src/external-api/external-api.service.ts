import { Injectable } from '@nestjs/common'
import { GetRandomApi } from './endpoints/random/get-random.api'

@Injectable()
export class ExternalAPIService {
	constructor(private readonly randomEndpoint: GetRandomApi) {}

	async testGet() {
		return await this.randomEndpoint.getRandom()
	}

	async testPost(body: any) {}
}
