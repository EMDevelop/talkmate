import { Injectable } from '@nestjs/common'
import { GetRandomApi } from './endpoints/random/get-random.api'
import { OpenAiApi } from './endpoints/random/open-ai.api'
import { GptPromptBody } from 'src/types/GptPromptBody'

@Injectable()
export class ExternalAPIService {
	constructor(
		private readonly randomEndpoint: GetRandomApi,
		private readonly openAiEndpoint: OpenAiApi
	) {}

	async testGet() {
		return await this.randomEndpoint.getRandom()
	}

	testStream() {
		return this.randomEndpoint.testingDataStreaming()
	}

	async gptPost(body: GptPromptBody) {
		const systemPrompt = body.discussionTopic
		const userPrompt = body.prompt
		return await this.openAiEndpoint.promptChatGpt(systemPrompt, userPrompt)
	}

	async ttsPost(body: any) {
		return await this.openAiEndpoint.ttsService(body.text)
	}
}
