import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { mergeMap, materialize, delay, dematerialize } from 'rxjs/operators';

const mockResponse = [
	{
	name: 'Shirt',
	img: 'https://images.hugoboss.com/is/image/boss/hbeu50260064_001_21',
	price: '300 £'
},
	{
	name: 'Jeans',
	img: 'https://images.hugoboss.com/is/image/boss/hbeu50302744_410_21',
	price: '300 £'
},
	{
	name: 'Jacket',
	img: 'https://images.hugoboss.com/is/image/boss/hbeu50232148_401_21',
	price: '300 £'
},
	{
	name: 'Shirt',
	img: 'https://images.hugoboss.com/is/image/boss/hbeu50260064_001_21',
	price: '300 £'
},
	{
	name: 'Jeans',
	img: 'https://images.hugoboss.com/is/image/boss/hbeu50302744_410_21',
	price: '300 £'
},
	{
	name: 'Jacket',
	img: 'https://images.hugoboss.com/is/image/boss/hbeu50232148_401_21',
	price: '300 £'
},
	{
	name: 'Shirt',
	img: 'https://images.hugoboss.com/is/image/boss/hbeu50231550_464_21',
	price: '300 £'
},
	{
	name: 'Shirt',
	img: 'https://images.hugoboss.com/is/image/boss/hbeu50260064_001_21',
	price: '300 £'
},
	{
	name: 'Shirt',
	img: 'https://images.hugoboss.com/is/image/boss/hbeu50231550_199_21',
	price: '300 £'
},
	{
	name: 'Shirt',
	img: 'https://images.hugoboss.com/is/image/boss/hbeu50260064_001_21',
	price: '300 £'
},
];
@Injectable()
export class FakeBackendInterceptor implements HttpInterceptor {

	constructor() {
	}

	public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		// wrap in delayed observable to simulate server api call
		return of(null).pipe(mergeMap(() => {

			// authenticate
			if (request.url.endsWith('/products') && request.method === 'GET') {
					return of(new HttpResponse({status: 200, body: mockResponse}));
				// } else {
				// 	// else return 400 bad request
				// 	return throwError({error: {message: 'Username or password is incorrect'}});
				// }
			}
			if (request.url.includes('/products?') && request.method === 'GET') {
				const q = request.url.split('?q=')[1];
				const filterResponse = mockResponse.filter(product => product.name.toLowerCase().includes(q.toLocaleLowerCase()));
				return of(new HttpResponse({status: 200, body: filterResponse}));
			// } else {
			// 	// else return 400 bad request
			// 	return throwError({error: {message: 'Username or password is incorrect'}});
			// }
		}
			// pass through any requests not handled above
			return next.handle(request);

		}))

		// call materialize and dematerialize to ensure delay even if an error is thrown (https://github.com/Reactive-Extensions/RxJS/issues/648)
			.pipe(materialize())
			.pipe(delay(500))
			.pipe(dematerialize());
	}
}

export let fakeBackendProvider = {
	// use fake backend in place of Http service for backend-less development
	provide: HTTP_INTERCEPTORS,
	useClass: FakeBackendInterceptor,
	multi: true
};
