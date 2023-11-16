import { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios'

export function logRequest() {
	return (request: AxiosRequestConfig): AxiosRequestConfig => {
		const isLoginURL = request.url?.includes('login')
		if (request.method === 'post' && !isLoginURL) {
			console.debug(
				'[API Interceptor] REQUEST - Sending %s request to %s with data: %s',
				request.method,
				request.url,
				JSON.stringify(request.data)
			)
		} else {
			console.debug(
				'[API Interceptor] REQUEST - Sending %s request to %s',
				request.method,
				request.url
			)
		}
		return request
	}
}

export function logResponse() {
	return (response: AxiosResponse<unknown>): AxiosResponse<unknown> => {
		console.debug(
			'[API Interceptor]:  RESPONSE - Status: (%s), Data: %s',
			response.status,
			response.data
		)
		return response
	}
}

export function logError() {
	return (error: AxiosError<unknown>): Promise<AxiosError> => {
		console.error(
			'[API Interceptor]: ERROR - code: (%s), message: (%s), response: %s',
			error.code,
			error.message,
			error.response?.data
		)
		return Promise.reject(error)
	}
}
