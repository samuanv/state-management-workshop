import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ProductListComponent } from './product-list/product-list.component';
import { fakeBackendProvider } from './product-list/product-list.interceptor';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@NgModule({
   declarations: [
      AppComponent,
      ProductListComponent
   ],
   imports: [
			BrowserModule,
			HttpClientModule,
			CommonModule
   ],
   providers: [
		// {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
		fakeBackendProvider
	],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
