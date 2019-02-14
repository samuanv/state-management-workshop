import { Injectable, ɵConsole } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ProductListService {

	public productList;

	constructor(private httpClient: HttpClient) {}

	public getProductList(): void {
		this.httpClient.get('localhost:3000/products').subscribe(response => {
			this.productList = response;
		});
	}
}
