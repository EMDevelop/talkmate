import 'dotenv/config'
import { Injectable } from '@nestjs/common'
import { ReadStream } from 'fs'
import { OpenAI } from 'openai'

@Injectable()
export class OpenAiApi {
	private client: OpenAI

	constructor() {
		this.client = new OpenAI()
	}

	async promptChatGpt(systemPrompt: string, userPrompt: string) {
		const stream = await this.client.chat.completions.create({
			model: 'gpt-3.5-turbo-1106',
			messages: [
				{
					role: 'system',
					content: systemPrompt
				},
				{ role: 'user', content: userPrompt }
			],
			stream: true
		})

		let responseString = ''
		for await (const chunk of stream) {
			responseString += chunk.choices[0]?.delta.content || ''
		}
		return responseString
	}

	async ttsService(text: string) {
		const response = await this.client.audio.speech.create({
			model: 'tts-1',
			voice: 'alloy',
			input: text
		})

		// response.body typing seems to be incorrect hence the unknown type cast
		// I also don't think the data is actually streamed back from OpenAI - seems to be an open issue
		// related thread: https://community.openai.com/t/streaming-from-text-to-speech-api/493784
		return response.body as unknown as ReadStream
	}
}
