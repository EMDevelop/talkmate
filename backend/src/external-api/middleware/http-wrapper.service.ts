import { Inject, Injectable } from '@nestjs/common'
import { AxiosRequestConfig, AxiosResponse } from 'axios'
import { AxiosInstance } from 'axios'
import { logResponse, logRequest, logError } from './http-interceptors'

export const AxiosInstanceToken = 'AxiosInstance'

@Injectable()
export class HTTPWrapperService {
	constructor(@Inject(AxiosInstanceToken) private readonly http: AxiosInstance) {
		this.http.interceptors.request.use(logRequest())
		this.http.interceptors.response.use(logResponse(), logError())
	}

	async get<T>(url: string, config?: AxiosRequestConfig): Promise<AxiosResponse<T, unknown>> {
		return this.http.get<T>(url, config)
	}

	async post<ResponseObject>(url: string, data?: unknown, config?: AxiosRequestConfig): Promise<AxiosResponse<ResponseObject, unknown>> {
		return await this.http.post<ResponseObject>(url, data, config)
	}
}
