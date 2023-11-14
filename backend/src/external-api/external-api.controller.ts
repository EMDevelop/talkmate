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
}
