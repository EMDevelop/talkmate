import { Module } from '@nestjs/common'
import { AppService } from './app.service'
import { ExternalAPIModule } from './external-api/external-api.module'
import { UserModule } from './user/user.module'

@Module({
	imports: [ExternalAPIModule, UserModule],
	controllers: [],
	providers: [AppService]
})
export class AppModule {}
