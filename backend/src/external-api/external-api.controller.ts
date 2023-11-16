import 'dotenv/config'
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

	@Post('test')
	async processPostTest(@Res() response: Response, @Body() body: any): Promise<void> {
		console.log(body)
		await this.apiService.testPost(body)
		response.status(HttpStatus.OK).send('body')
	}

	@Post('gpt-test')
	async processPromptChatGpt(@Res() response: Response, @Body() body: any): Promise<void> {
		console.log(body)
		const result = await this.apiService.gptPost(body)
		response.status(HttpStatus.OK).send(result)
	}

	@Post('tts-test')
	async processTts(@Res() response: Response, @Body() body: any): Promise<void> {
		console.log(body)
		await this.apiService.ttsPost(body)
		response.status(HttpStatus.OK).send('done')
	}

	@Post('combo-test')
	async processConversation(@Res() response: Response, @Body() body: any): Promise<void> {
		console.log(body)
		const gptResponse = await this.apiService.gptPost(body)
		const audioResponseBuffer = await this.apiService.ttsPost({ text: gptResponse })
		response.contentType('audio/mpeg')
		response.status(HttpStatus.OK).send(audioResponseBuffer)
	}
}
