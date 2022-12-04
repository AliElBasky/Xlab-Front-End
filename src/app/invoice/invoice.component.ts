import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { InvoiceService } from '../invoice.service';



@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {

  getInvoiceDetails: any[] = [];
  id: any;
  deleteId: any;
  invoiceId: any;
  updatedId: any;
  customerName: any;
  date: any;
  itemsCount: any;
  totalAmount: any;
  addFlag = false;
  updateFlag = false;
  errorMessage: any;
  invoiceForm: any;

  constructor(private _InvoiceService: InvoiceService, private fb: FormBuilder) {

  }

  GetInvoice(id: any) {    
    if (id == null || id.startsWith(" ")) {
      window.alert("please insert the Id ..")
    }
    else{
      this._InvoiceService.sendGetRequest(id).subscribe((data) => {
        this.invoiceId = data.invoiceId;
        this.customerName = data.customerName;
        this.date = data.dateTime;
        this.itemsCount = data.itemsCount;
        this.totalAmount = data.totalAmount;
        this.getInvoiceDetails = data.invoiceDetails
      }, response => {
        console.log(response)
        window.alert(response.error)});
    }
    
  }

  ngOnInit(): void {
    this.invoiceForm = this.fb.group({
      invoiceId: new FormControl(null, Validators.required),
      customerName: new FormControl(null, Validators.required),
      dateTime: new FormControl(null, Validators.required),
      itemsCount: new FormControl(null, Validators.required),
      totalAmount: new FormControl(null, Validators.required),
      invoiceDetails: this.fb.array([this.addDeailsFormGroup()])
    })
  }
  removeDetailsButton(number: number) {
    let items = this.invoiceForm.get('invoiceDetails') as FormArray;
    items.removeAt(number);
  }
  addDeailsFormGroup(): FormGroup {
    return this.fb.group({
      item: new FormControl(null, Validators.required),
      price: new FormControl(null, Validators.required),
      quantity: new FormControl(null, Validators.required),
      totalAmount: new FormControl(null, Validators.required)
    })
  }

  addDetailsButton(): void {
    this.invoiceForm.get('invoiceDetails').push(this.addDeailsFormGroup()) as FormArray;
  }

  addInvoice(data: FormGroup) {
    const { invoiceId, customerName, dateTime, itemsCount,
      totalAmount, invoiceDetails } = data.value

    const formatedData = {
      invoiceId,
      customerName,
      dateTime,
      itemsCount,
      totalAmount,
      invoiceDetails: invoiceDetails
    }

    console.log(formatedData);
    if (invoiceId == undefined || invoiceId.startsWith(" ")) {
      window.alert("please insert the id ..")
      
    }else{
      this._InvoiceService.sendPostRequest(formatedData).subscribe((response: any) => {
        window.alert("invoice has been added successfully ..")
        this.clearButton();
        this.GetInvoice(invoiceId)
      }, (response) => {
        console.log(response.error);
        window.alert(response.error)
      });
    }
    
  }


  updateInvoice(data: FormGroup) {
    const { invoiceId, customerName, dateTime, itemsCount,
      totalAmount, invoiceDetails } = data.value

    const formatedData = {
      invoiceId,
      customerName,
      dateTime,
      itemsCount,
      totalAmount,
      invoiceDetails: invoiceDetails
    }

    console.log(formatedData)

    if (invoiceId == undefined || invoiceId.startsWith(" ")) {
      window.alert("please insert the id ..")
    } else {
      this._InvoiceService.sendUpdateRequest(formatedData, this.invoiceId).subscribe((response: any) => {
        console.log(response);
        window.alert("invoice has been updated ..");
        this.GetInvoice(invoiceId);
      },(response) => {
        console.log(response.error);
        window.alert(response.error);
      });
    }
  }


  DeleteInvoice() {
    this._InvoiceService.sendDeleteRequest(this.deleteId).subscribe((data) => {
      window.alert("invoice has been deleted..");
    },(response) => {
      console.log(response.error);
      window.alert(response.error);
    })
  }


  AddButton() {
    this.updateFlag = false;
    return this.addFlag = true;
  }



  UpdateButton() {
    this.addFlag = false;
    return this.updateFlag = true;
  }

  clearButton() {
    this.invoiceForm.reset();
  }

}
