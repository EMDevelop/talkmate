import { Injectable } from '@nestjs/common'
import { OpenAI } from 'openai'

@Injectable()
export class OpenAiApi {
	private client: OpenAI

	constructor() {
		this.client = new OpenAI()
	}

	async promptChatGpt(prompt: string) {
		const stream = await this.client.chat.completions.create({
			model: 'gpt-3.5-turbo-1106',
			messages: [{ role: 'user', content: prompt ?? 'Say this is a test' }],
			stream: true
		})

		let responseString = ''
		for await (const chunk of stream) {
			responseString += chunk.choices[0]?.delta.content || ''
		}
		return responseString
	}

	async ttsService(text: string) {
		const mp3 = await this.client.audio.speech.create({
			model: 'tts-1',
			voice: 'alloy',
			input: text
		})

		return Buffer.from(await mp3.arrayBuffer())
	}
}
