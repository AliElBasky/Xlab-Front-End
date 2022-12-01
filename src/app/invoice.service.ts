import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InvoiceService {

  constructor(private _HttpClient : HttpClient) { }

  sendGetRequest(id:string):Observable<any>
  {
    return this._HttpClient.get(`https://localhost:44319/api/invoices/get?id=${id}`);
  }

  sendPostRequest(formData:any):Observable<any>
  {
    return this._HttpClient.post(`https://localhost:44319/api/invoices/add`, formData);
  }

  sendUpdateRequest(formData:any, id:any):Observable<any>
  {
    return this._HttpClient.put(`https://localhost:44319/api/invoices/update?id=${id}`, formData);
  }

  sendDeleteRequest(id: any):Observable<any>
  {
    return this._HttpClient.delete(`https://localhost:44319/api/invoices/delete?id=${id}`)
  }
}
