import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)
	app.use(helmet())
	await app.listen(3000)
}
bootstrap()

function helmet(): any {
	throw new Error('Function not implemented.')
}
// TODO: add some security to only allow being accessed by our app?
// app.enableCors({ origin, credentials: true })
