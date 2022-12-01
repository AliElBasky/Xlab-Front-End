import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { InvoiceModule } from './invoice/invoice.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
      BrowserModule,InvoiceModule,
      ReactiveFormsModule,
      AppRoutingModule,FormsModule,HttpClientModule, 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
