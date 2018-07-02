import { Component, OnInit } from '@angular/core';
import { OperationsService } from '../operations.service';

import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-invoices',
  templateUrl: './invoices.component.html',
  styleUrls: ['./invoices.component.css']
})
export class InvoicesComponent implements OnInit {
  public cc:any;
  public invoicedata:any;
  public havedata=false;
  public invoicedetails:any;

  constructor(public operations:OperationsService,public rout:Router) { }

  ngOnInit() {
  	this.getInvoices();
  }
  getInvoices() {
  	this.cc = localStorage.getItem('cc');
    var bid = localStorage.getItem("bid");
    console.log("send me bid, bid", bid);
  	this.operations.invoice(this.cc, bid).subscribe((res:any)=> {
      if(res.success==0)
      {
        Swal({
          title: 'warning',
          text: 'No Invoices Found',
          type: 'warning',
          timer: 3000
        })
        this.invoicedata="No Data Found";
        console.log(this.invoicedetails,"this is the invoice details needed to be shown");
        this.rout.navigateByUrl("product/lot_details");
      }
      else
      {
        console.log(res.data.length,"res.data[2].linktodocument");
        for(var g=0;g<res.data.length;g++)
        {
          this.invoicedetails=res.data;
          var check=res.data[g].linktodocument;
        }
       // var check=res.data[2].linktodocument;
        this.havedata=true;
        //console.log(res,"the main invoice data is here");
        //this.invoicedetails=res.data;
        //console.log(res.data[2].linktodocument);
       // console.log(check.indexOf("doc",2),"indexof");
      }
  	},(err)=> {
      console.log(err,"err in invoice");
      Swal({
        title: 'warning',
        text: err.message,
        type: 'error',
        timer: 3000
      })
  	})
  }
}
