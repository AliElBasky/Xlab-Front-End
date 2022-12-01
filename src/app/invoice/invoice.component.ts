import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { InvoiceService } from '../invoice.service';



@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {


  invoiceDetails:any [] = [];
  id = "";
  invoiceId = "";
  customerName = "";
  date = "";
  itemsCount = "";
  totalAmount = "";
  constructor(public _InvoiceService: InvoiceService) {
    
  }


  GetInvoice(){
      this._InvoiceService.sendGetRequest(this.id).subscribe((data)=>{
      this.invoiceId = data.invoiceId;
      this.customerName = data.customerName;
      this.date = data.dateTime;
      this.itemsCount = data.itemsCount;
      this.totalAmount = data.totalAmount;
      this.invoiceDetails = data.invoiceDetails
    })
  }

  

  public addForm: FormGroup = new FormGroup({
    invoiceId: new FormControl(null, Validators.required),
    customerName: new FormControl(null, Validators.required),
    dateTime: new FormControl(null, Validators.required),
    itemsCount: new FormControl(null, Validators.required),
    totalAmount: new FormControl(null, Validators.required),
    item: new FormControl(null, Validators.required),
    price: new FormControl(null, Validators.required),
    quantity: new FormControl(null, Validators.required),
    totalItemsAmount: new FormControl(null, Validators.required)
  });

  save(addForm: FormGroup) {
    const { invoiceId, customerName, dateTime, itemsCount,
      totalAmount, item, price, quantity, totalItemsAmount } = addForm.value

    const formatedData = {
      invoiceId,
      customerName,
      dateTime,
      itemsCount,
      totalAmount,
      invoiceDetails: [{
        item,
        price,
        quantity,
        totalItemsAmount
      }]
    }

    this._InvoiceService.sendUpdateRequest(formatedData, this.id)
    

    window.alert("Invoice is added !");


    console.log(formatedData);
    this._InvoiceService.sendPostRequest(formatedData).subscribe((response: any) => {
      console.warn("Resulted Object : ", response);
    });

    window.alert("Invoice is added !");
  }

  ngOnInit(): void {
  }

}
