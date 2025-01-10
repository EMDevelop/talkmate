import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common'
import { Response } from 'express'
import { ExternalAPIService } from './external-api.service'

@Controller('external')
export class ExternalController {
	constructor(private readonly apiService: ExternalAPIService) {}

	@Get('test')
	async processGetTest(@Res() response: Response): Promise<void> {
		console.log(`Initiated Test`)
		await this.apiService.testGet()
		response.status(HttpStatus.OK).send('body')
	}

	@Get('stream-test')
	async processStreamingFile(@Res() response: Response, @Body() body: any): Promise<void> {
		console.log(body)
		const stream = this.apiService.testStream()
		response.contentType('audio/mpeg')
		stream.pipe(response)
	}

	@Post('gpt-prompt')
	async processPromptChatGpt(@Res() response: Response, @Body() body: any): Promise<void> {
		console.log(body)
		const result = await this.apiService.gptPost(body)
		response.status(HttpStatus.OK).send(result)
	}

	@Post('tts-prompt')
	async processTts(@Res() response: Response, @Body() body: any): Promise<void> {
		console.log(body)
		const audioResponseStream = await this.apiService.ttsPost(body)

		response.contentType('audio/mpeg')
		response.status(HttpStatus.OK)
		audioResponseStream.pipe(response)
	}

	@Post('combo-test')
	async processConversation(@Res() response: Response, @Body() body: any): Promise<void> {
		console.log(body)
		const gptResponse = await this.apiService.gptPost(body)
		const audioResponseStream = await this.apiService.ttsPost({ text: gptResponse })

		response.contentType('audio/mpeg')
		response.status(HttpStatus.OK)
		audioResponseStream.pipe(response)
	}
}
