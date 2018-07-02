import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { OperationsService } from '../operations.service';

import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  public params;
  public currentpage;
  public uniqueBrands:any =[];
  public brands:any =[];
  public selectedBrand:any=[];
  public selected=true;
  public models:any = [];
  public logcheck=false;
  constructor(private route: ActivatedRoute,public operations:OperationsService,public spinner:NgxSpinnerService) { }
  public data:any;
  ngOnInit() {
   this.route.params.subscribe( res => {
      this.params = res;

      });
   console.log(this.params,"this.params");
   this.brandList();
   let islogged = localStorage.getItem("isLogged");
   if(islogged=="true")
   {
    this.logcheck=true;
   }
   else
   {
     this.logcheck=false;
   }
  }
  brandList(){
    this.spinner.show();
      this.operations.allBrands().subscribe((res:any)=> {
        this.spinner.hide();
        this.uniqueBrands = res.data;
        for(var i = 0; i< this.uniqueBrands.length; i++){    
           this.brands.push(this.uniqueBrands[i].name);
           //this.navigation = this.brands; 

           // console.log(this.navigation,"this.navigation");
        }
      },
      (error)=> {
        console.log(error,"error message");
      })
    }
  geturl()
  {
    var url=window.location;
    console.log(url.pathname);
    if(url.pathname.includes("lot_details"))
    {
      this.currentpage="lot_details";
    }
    else if(url.pathname.includes("stats"))
    {
      this.currentpage="stats";
    }
    else if(url.pathname.includes("offers"))
    {
      this.currentpage="offers";
    }
    else if(url.pathname.includes("chat"))
    {
      this.currentpage="chat";
    }
    else if(url.pathname.includes("invoices"))
    {
      this.currentpage="invoices";
    }
    else if(url.pathname.includes("pictures"))
    {
      this.currentpage="pictures";
    }
    else if(url.pathname.includes("state"))
    {
      this.currentpage="stats";
    }
    console.log(this.currentpage);
  }

  selected_brand(data) {
    this.selected=false;
    this.selectedBrand = data.value;
    this.operations.models(data.value).subscribe((res:any)=> {
      this.models = res.data;
    },(err)=> {
      console.log(err,"error models");
    })
    
  }
}
