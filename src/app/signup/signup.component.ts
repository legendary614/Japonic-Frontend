import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OperationsService } from '../operations.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from '../auth.service';
import Swal from 'sweetalert2';
declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  public message="";
  public country:any = [];
  public regions:any=[];
  public countrycode=0;
  public requirefield = false;
  constructor( public auth:AuthService, public operations:OperationsService,public service:AuthService,public rout:Router,public spinner:NgxSpinnerService) { }

  ngOnInit() {
    this.countries();
    this.region();
    
  }
  countries() {
    this.operations.countryList().subscribe((res:any) => {
      this.country = res.data;
      console.log(res, "response after selecting country");
    },(err) => {
      console.log(err,"error");
    })
  }
  region() {
    console.log(this.countrycode,"this is the country code");
    this.operations.regionList(this.countrycode).subscribe((res:any) => {
      console.log(res,"regionList");
      this.regions = res.data;
      console.log(this.regions,"this.regions");
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
signup(data)
{
  console.log(data);
  var p1=data.password;
  var p2=data.password2;
  if(p1!=p2)
  {
    Swal({
          title: 'Error',
          text: 'Password and confirm password should be same',
          type: 'error',
          timer: 3000
        })
  }

  else
  {
    console.log(data,"signup data");
      this.spinner.show();
    this.auth.signup(data).subscribe((res:any)=> {
      this.rout.navigateByUrl("confirmation");
      this.spinner.hide();

    },(err)=> {
      this.spinner.hide();
      console.log(err,"err of signup"); 
      Swal({
          title: 'Error',
          text: "something went wrong, try again",
          type: 'error',
          timer: 3000
        })
    })
    
  }
}
getcode(e)
{
  var code= $('#country').val()
  
  this.countrycode=code;
  console.log(this.countrycode);
  this.region();
}
}
