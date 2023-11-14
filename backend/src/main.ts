import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import helmet from 'helmet'

async function bootstrap() {
	const app = await NestFactory.create(AppModule)
	app.use(helmet())
	await app.listen(3000)
}
bootstrap()

// TODO: add some security to only allow being accessed by our app?
// app.enableCors({ origin, credentials: true })
