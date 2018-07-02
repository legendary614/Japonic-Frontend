import { Component, OnInit } from '@angular/core';
declare var jquery:any;
declare var $ :any;
import { OperationsService } from '../operations.service';
@Component({
  selector: 'app-profile-landing',
  templateUrl: './profile-landing.component.html',
  styleUrls: ['./profile-landing.component.css']
})
export class ProfileLandingComponent implements OnInit {
  public country:any = [];
  public regions:any=[];
  public countrycode;
  public requirefield = false;
  constructor(public operations:OperationsService) { }

  ngOnInit() {
    this.countries();
    var countrycode=localStorage.getItem("countrycode");
    var regioncode=localStorage.getItem("regioncode");
    if((countrycode === "null")||(countrycode === "")||(regioncode === null)||(regioncode === ""))
    {
      console.log("no country code");
      $('#myModal').modal('show');
    }
    else
    {
      console.log(countrycode,"country code");
      console.log(regioncode,"region code code");
    }
    
    console.log(countrycode,"this is the country code on init");
      
       
  }
 countries() {
    this.operations.countryList().subscribe((res:any) => {
      this.country = res.data;
   //   console.log(res, "response after selecting country");
    },(err) => {
      console.log(err,"error");
    })
  }
  region() {
    console.log(this.countrycode,"this is the country code");
    this.operations.regionList(this.countrycode).subscribe((res:any) => {
    //  console.log(res,"regionList");
      this.regions = res.data;
    //  console.log(this.regions,"this.regions");
      if(this.regions=="")
      {
        console.log("NO REGIONS ");
        this.requirefield = false;
      }
      else
      {
        this.requirefield = true
      }
    },(err) => {
      console.log(err,"error");
    })
  }

  addcountry(data)
  {
    var cc = localStorage.getItem("cc");
    
   // console.log(cc,"Customer Code");
   // console.log(data, "COUNTRY CODE");
   // console.log(data.regionCode, "is this the region CODE?????????????");
    var details = {
      cc:cc,
      countrycode:data.country,
      regioncode:data.regionCode
    }
    console.log(details,"full details");
    this.operations.savecountry(details).subscribe((res:any)=>{

     
     // console.log(res,"country save message");
      if(res.success==1)
      {
       
        localStorage.setItem('countrycode',res.data[0].countrycode);
        localStorage.setItem('regioncode',res.data[0].regioncode);
        this.countrycode=localStorage.getItem("countrycode");
        
        console.log("Countrycode saved");
        $('#myModal').modal('hide');
      }
      else
      {
        console.log(res.data.message,"error in saving country code");
      }
    })
    
  }
  getcode(e)
  {
    var code= $('#country').val()
    
    this.countrycode=code;
    //console.log(this.countrycode);
    this.region();
  }
}
