import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { debounceTime } from 'rxjs/operators';
export interface Product {
	name: string;
	img: string;
	price: string;
}
@Injectable({
  providedIn: 'root'
})
export class ProductListService {

	public productList;
	private localProductList;

	constructor(private httpClient: HttpClient) {}

	public getProductList(): void {
		this.httpClient.get('localhost:3000/products').subscribe(response => {
			this.localProductList = response;
			this.productList = this.localProductList;
		});
	}
	public filterProductList(term: string) {
			this.httpClient.get<Product[]>('localhost:3000/products?q=' + term)
			.pipe(debounceTime(5000)).subscribe(products => this.productList = products);
	}
}
