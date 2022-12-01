import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { InvoiceService } from '../invoice.service';



@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {


  invoiceDetails:any [] = [];
  id = "";
  deleteId = "";
  invoiceId = "";
  updatedId = "";
  customerName = "";
  date = "";
  itemsCount = "";
  totalAmount = "";
  addFlag = false;
  updateFlag =false;

  constructor(public _InvoiceService: InvoiceService, public fb: FormBuilder) {
    
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

  
  DeleteInvoice(){
    this._InvoiceService.sendDeleteRequest(this.deleteId).subscribe((data)=>{
      window.alert("invoice has been deleted..")
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
    itemAmount: new FormControl(null, Validators.required)
  });

  add(addForm: FormGroup) {
    const { invoiceId, customerName, dateTime, itemsCount,
      totalAmount, item, price, quantity, itemAmount } = addForm.value

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
        itemAmount
      }]
    }    

    console.log(formatedData);

    this._InvoiceService.sendPostRequest(formatedData).subscribe((response: any) => {
      console.warn("Resulted Object : ", response);
    });

    window.alert("Invoice has been added ..");
  }

  update(addForm: FormGroup){
    const  { invoiceId, customerName, dateTime, itemsCount,
      totalAmount, item, price, quantity, itemAmount } = addForm.value

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
        itemAmount
      }]
    }  
    
    console.log(formatedData)
    
    this._InvoiceService.sendUpdateRequest(formatedData, this.updatedId).subscribe((response: any)=> {
      console.warn(response);
    })
    window.alert("Invoice updated ..")
  }

  AddButton(){
    this.updateFlag = false;
    return this.addFlag = true; 
  }

  UpdateButton(){
    this.addFlag = false;
    return this.updateFlag = true;
  }

  clear(){
    this.addForm.reset();
  }


  ngOnInit(): void {
  }

}
