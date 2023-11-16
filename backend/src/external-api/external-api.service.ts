import { Injectable } from '@nestjs/common'
import { GetRandomApi } from './endpoints/random/get-random.api'
import { OpenAiApi } from './endpoints/random/open-ai.api'

@Injectable()
export class ExternalAPIService {
	constructor(
		private readonly randomEndpoint: GetRandomApi,
		private readonly openAiEndpoint: OpenAiApi
	) {}

	async testGet() {
		return await this.randomEndpoint.getRandom()
	}

	async testPost(body: any) {
		return 'some string' + body
	}

	async gptPost(body: any) {
		return await this.openAiEndpoint.promptChatGpt(body.prompt)
	}

	async ttsPost(body: any) {
		return await this.openAiEndpoint.ttsService(body.text)
	}
}
