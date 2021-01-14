import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import networkConstants from '../constants/networkConstants';

import NetworkUtils from './index';

const mock = new MockAdapter(axios);

const {
	UNAUTHORIZED_MESSAGE,
	BAD_REQUEST_MESSAGE,
	FORBIDDEN_MESSAGE,
	NOT_FOUND_MESSAGE,
	REQUEST_TIMED_OUT,
	SERVER_ERROR,
	BAD_GATEWAY,
	GATEWAY_TIMEOUT,
} = networkConstants;

test('should fetch data successfully', async () => {
	const mockData = { data: { fname: 'test' } };
	mock.onGet().reply(200, mockData);
	const requestObject = {
		method: 'get',
		url: 'http://test.com',
	};
	const response = await NetworkUtils.makeApiRequest(requestObject);
	expect(response.status).toBe(200);
	expect(response.responseData.data).toEqual({ fname: 'test' });
});

test('should give badRequest Error', async () => {
	const mockError = {
		status: 400,
		errorMessage: BAD_REQUEST_MESSAGE,
	};
	mock.onGet().reply(400, mockError);
	const requestObject = {
		method: 'get',
		url: 'http://test.com',
	};
	try {
		const response = await NetworkUtils.makeApiRequest(requestObject);
		console.log(response);
	} catch (e) {
		expect(e.status).toBe(400);
		expect(e).toEqual({
			status: 400,
			errorMessage: BAD_REQUEST_MESSAGE,
		});
	}
});

test('should give Unauthorized Error', async () => {
	const mockError = {
		status: 401,
		errorMessage: UNAUTHORIZED_MESSAGE,
	};
	mock.onGet().reply(401, mockError);
	const requestObject = {
		method: 'get',
		url: 'http://test.com',
	};
	try {
		const response = await NetworkUtils.makeApiRequest(requestObject);
		console.log(response);
	} catch (e) {
		expect(e.status).toBe(401);
		expect(e).toEqual({
			status: 401,
			errorMessage: UNAUTHORIZED_MESSAGE,
		});
	}
});

test('should give Forbidden Error', async () => {
	const mockError = {
		status: 403,
		errorMessage: FORBIDDEN_MESSAGE,
	};
	mock.onGet().reply(403, mockError);
	const requestObject = {
		method: 'get',
		url: 'http://test.com',
	};
	try {
		const response = await NetworkUtils.makeApiRequest(requestObject);
		console.log(response);
	} catch (e) {
		expect(e.status).toBe(403);
		expect(e).toEqual({
			status: 403,
			errorMessage: FORBIDDEN_MESSAGE,
		});
	}
});

test('should give Not found Error', async () => {
	const mockError = {
		status: 404,
		errorMessage: NOT_FOUND_MESSAGE,
	};
	mock.onGet().reply(404, mockError);
	const requestObject = {
		method: 'get',
		url: 'http://test.com',
	};
	try {
		const response = await NetworkUtils.makeApiRequest(requestObject);
		console.log(response);
	} catch (e) {
		expect(e.status).toBe(404);
		expect(e).toEqual({
			status: 404,
			errorMessage: NOT_FOUND_MESSAGE,
		});
	}
});

test('should give requuest timeout Error', async () => {
	const mockError = {
		status: 408,
		errorMessage: REQUEST_TIMED_OUT,
	};
	mock.onGet().reply(408, mockError);
	const requestObject = {
		method: 'get',
		url: 'http://test.com',
	};
	try {
		const response = await NetworkUtils.makeApiRequest(requestObject);
		console.log(response);
	} catch (e) {
		expect(e.status).toBe(408);
		expect(e).toEqual({
			status: 408,
			errorMessage: REQUEST_TIMED_OUT,
		});
	}
});

test('should give requuest timeout Error', async () => {
	const mockError = {
		status: 500,
		errorMessage: SERVER_ERROR,
	};
	mock.onGet().reply(500, mockError);
	const requestObject = {
		method: 'get',
		url: 'http://test.com',
	};
	try {
		const response = await NetworkUtils.makeApiRequest(requestObject);
		console.log(response);
	} catch (e) {
		expect(e.status).toBe(500);
		expect(e).toEqual({
			status: 500,
			errorMessage: SERVER_ERROR,
		});
	}
});

test('should give bad Gateway Error', async () => {
	const mockError = {
		status: 502,
		errorMessage: BAD_GATEWAY,
	};
	mock.onGet().reply(502, mockError);
	const requestObject = {
		method: 'get',
		url: 'http://test.com',
	};
	try {
		const response = await NetworkUtils.makeApiRequest(requestObject);
		console.log(response);
	} catch (e) {
		expect(e.status).toBe(502);
		expect(e).toEqual({
			status: 502,
			errorMessage: BAD_GATEWAY,
		});
	}
});

test('should give Gateway timeout Error', async () => {
	const mockError = {
		status: 503,
		errorMessage: GATEWAY_TIMEOUT,
	};
	mock.onGet().reply(503, mockError);
	const requestObject = {
		method: 'get',
		url: 'http://test.com',
	};
	try {
		const response = await NetworkUtils.makeApiRequest(requestObject);
		console.log(response);
	} catch (e) {
		expect(e.status).toBe(503);
		expect(e).toEqual({
			status: 503,
			errorMessage: GATEWAY_TIMEOUT,
		});
	}
});

test('check if response is Memoized', async () => {
	const mockData = { data: { fname: 'test' } };
	mock.onGet().reply(200, mockData);
	const requestObject = {
		method: 'get',
		url: 'http://test.com',
		memoizeResponse: true,
	};
	try {
		const response = await NetworkUtils.makeApiRequest(requestObject);
		console.log(response);
		expect(NetworkUtils.memoizedData['http://test.com']).toBe({ data: { fname: 'test' } });
	} catch (e) {
		console.log(e);
	}
});

test('check and send back Memoized response', async () => {
	const mockData = { data: { fname: 'test2' } };
	mock.onGet().reply(200, mockData);
	const requestObject = {
		method: 'get',
		url: 'http://test.com',
		memoizeResponse: true,
	};
	try {
		const response = await NetworkUtils.makeApiRequest(requestObject);
		console.log(response);
		const secondReponse = await NetworkUtils.makeApiRequest(requestObject);
		expect(secondReponse.status).toBe(200);
		expect(secondReponse.responseData.data).toEqual({ fname: 'test2' });
	} catch (e) {
		console.log(e);
	}
});

test('params serialization should work ', async () => {
	const mockData = { data: { fname: 'test' } };
	mock.onGet().reply(200, mockData);
	const requestObject = {
		method: 'get',
		url: 'http://test.com',
		params: {
			testArray: ['1', `2`],
		},
	};
	try {
		const response = await NetworkUtils.makeApiRequest(requestObject);
		expect(response.status).toBe(200);
		expect(response.responseData.data).toEqual({ fname: 'test' });
	} catch (e) {
		console.log(e);
	}
});
