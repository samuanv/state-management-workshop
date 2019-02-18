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

	public productList: Product[] = [];

	constructor(private httpClient: HttpClient) {}

	public getProductList(): void {
	}
	public filterProductList(term: string) {
	}
}
