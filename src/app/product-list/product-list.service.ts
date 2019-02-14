import { Injectable, ɵConsole } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, debounceTime } from 'rxjs/operators';
export interface Product {
	name: string;
	img: string;
	price: string;
}
@Injectable({
  providedIn: 'root'
})
export class ProductListService {

	public _productList$: BehaviorSubject<Product[]> = new BehaviorSubject(JSON.parse(localStorage.getItem('productList')));
	get productList$(): Observable<Product[]> {
		return this._productList$.asObservable();
	}
	constructor(private httpClient: HttpClient) {

		this._productList$.subscribe(products => {
			localStorage.setItem('productList', JSON.stringify(products));
		});
	}

	public getProductList(): void {
		this.httpClient.get<Product[]>('localhost:3000/products').subscribe(products => this._productList$.next(products));
	}
	public filterProductList(term: string) {
		this.httpClient.get<Product[]>('localhost:3000/products?q=' + term)
		.pipe(debounceTime(5000)).subscribe(products => this._productList$.next(products));
	}
}
