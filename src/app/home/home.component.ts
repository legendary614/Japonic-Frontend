import { Component, OnInit } from '@angular/core';
import { AuthService,productDetails } from '../auth.service'; //ALL API HITS LIVES HERE
import { OperationsService,searchParams } from '../operations.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import {IMyDpOptions} from 'mydatepicker';

import { ActivatedRoute } from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  //STORING THE DATA 
  p: number = 1;
  public selected=true;
  public alldata;
  public brands:any = [];
  public selectedBrand;
  public uniqueBrands:any = [];
  public models:any = [];
  public searchedData: searchParams = {
    brand: '',
    model: ''
  };
  public selectedModel;
  public allProducts;
  public navigation: any = [];
  public newbrand:object;
  public myDatePickerOptions: IMyDpOptions = {
        dateFormat: 'dd.mm.yyyy',
    };
    public allimages=[];
  
    //to store params data
    public param_brand:any;
    public param_fromYear:any;
    public param_toYear:any;
    public param_model:any;
    public param_auctionDate:any;
    public allparams:any;


  constructor(public service:AuthService, public spinner:NgxSpinnerService, public operations: OperationsService,public router: Router, public rout:ActivatedRoute) { }

  ngOnInit() {
    this.brandList();
    //if params are available , the following codes will be executed
    this.rout.queryParams.subscribe( params => {      
      this.allparams={
        auction:{
          formatted:params.auction_date
        },
        brand:params.brand,
        from_year:params.from_year,
        model:params.model,
        to_year:params.to_year
      }
      if(this.allparams.brand != undefined)
      {
        console.log(this.allparams,"i have params");
        this.search(this.allparams);

      }
      else
      {
        //when params are not available
        console.log("I DO NOT HAVE ANY PARAMS");
        this.spinner.show();
        this.operations.allProducts().subscribe((res:any)=>{
          this.spinner.hide();
          this.alldata=res.data;
          console.log(this.alldata,"this.alldata newww");
          this.data();
          console.log("after data");
          this.imageSpilit();
        })
      }
      
    })


  }
    
    brandList(){
      this.operations.allBrands().subscribe((res:any)=> {
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


  imageSpilit(){
    console.log("inside imagesplit");
    for(var i=0;i<this.alldata.length;i++){
      console.log("inside for image split");
      var imageArray=this.alldata[i].IMAGES.split('#');
      this.alldata[i].imagesplit=imageArray;
    }
  }
 
  selected_brand(data) {
    this.spinner.show();
    this.selectedBrand = data.value;
    if(data.value)
    {
      this.selected=false;
    }
    this.operations.models(data.value).subscribe((res:any)=> {
    
    this.spinner.hide();
    this.models = res.data;
    },(err)=> {
    console.log(err,"error models");
    })
    
  }

  search(searchData){
    console.log("SearchData newwwwwwwwwwwwwwww",searchData);
      this.operations.searchedItems(searchData).subscribe((res: any)=> {
        this.alldata = res.data;
        for(var i=0;i<this.alldata.length;i++){
          console.log("inside for image split");
          var imageArray=this.alldata[i].IMAGES.split('#');
          this.alldata[i].imagesplit=imageArray;
        }
        console.log(this.alldata, "searched items");
      },(err)=> {
        console.log(err,"error search query");
      })
  }

  // searchWithParams(searchData){
  //    console.log("SearchData newwwwwwwwwwwwwwww",searchData);
  //     this.operations.searchedItems(searchData).subscribe((res: any)=> {
  //       this.alldata = res.data;
  //       for(var i=0;i<this.alldata.length;i++){
  //         console.log("inside for image split");
  //         var imageArray=this.alldata[i].IMAGES.split('#');
  //         this.alldata[i].imagesplit=imageArray;
  //       }
  //       console.log(this.alldata, "searched items");
  //     },(err)=> {
  //       console.log(err,"error search query");
  //     })
  // }

  subNavSearch(a,b){
    this.newbrand={
      brand:a,
      model:b
    }
    console.log(this.newbrand,"this is the data i am looking for");
    
    this.operations.sidesearch(this.newbrand).subscribe((res: any)=> {
      console.log(res,"res search query");
      this.alldata = res.data;
      for(var i=0;i<this.alldata.length;i++){
        console.log("inside for image split");
        var imageArray=this.alldata[i].IMAGES.split('#');
        this.alldata[i].imagesplit=imageArray;
      }
    },(err)=> {
      console.log(err,"error search query");
    })
  }
  model(modelVal){
    this.selectedModel = modelVal.value;
    console.log(this.selectedModel,"this.selectedModel");
  }

  data(){
    var modelsArr = [];
    var check = true;
    var brandArr = [];
    var brandName = "";
    this.operations.sidebarData().subscribe((res:any) => {
      console.log(this.navigation,"test");
      
      for(let i=0;i < res.length ;i++){
        var alldatas = res[i].data;
         for(let i=0;i < alldatas.length ;i++){
           //console.log(alldatas[i].MARKA_NAME,alldatas[i].MODEL_NAME);
           if(modelsArr.indexOf(alldatas[i].MARKA_NAME) < 0 ){
             modelsArr.push(alldatas[i].MARKA_NAME);
             check = true;
             if(brandName){
               //this.navigation[brandName] = brandArr;
               this.navigation.push({name:brandName,detail:brandArr });
             }
             brandName = alldatas[i].MARKA_NAME;
             brandArr = [];
           }

           brandArr.push({model:alldatas[i].MODEL_NAME,total:alldatas[i].TAG4});
           //this.navigation[alldatas[i].MARKA_NAME][0] = {model:alldatas[i].MODEL_NAME,total:alldatas[i].TAG4};
           //i++;
         } 
      }
      console.log("navvv", this.navigation);

    },(err)=> {
      console.log("data err",err);
    })
  }

  topproduct(data1,data2) {
     this.router.navigateByUrl("product/lot_details/"+data1+"/"+data2);
  }
  // modelEntry(brandName){
  //   console.log(brandName,"beasukd");
  //   for(var i=0;i<this.brands.length;i++){
  //     this.brands[i] === this.navigation[brandName];
  //     for(var j=0)
  //     this.selectedModels.push
  //   }
  //   console.log(this.navigation[brandName],'nav')

  // }
 

}
