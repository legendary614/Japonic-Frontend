import { Component, OnInit } from '@angular/core';

import { OperationsService } from '../operations.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from 'angular2-social-login';
import Swal from 'sweetalert2';
declare var jquery:any;
declare var $ :any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public operations:OperationsService,public auth:AuthService,public rout:Router,private spinner: NgxSpinnerService) { }
  user:any;
  sub:any;
  public thisurl;
  public facebookbuttontext;
  public googlebuttontext;
  public loginname;
  public isLogged=false;
  ngOnInit() {
    this.thisurl = window.location.href; //window.location.href
    console.log(this.thisurl);
    if(localStorage.getItem("isLogged")==="true")
    {
      this.facebookbuttontext="Logged In";
      this.googlebuttontext="Logged In";
      this.loginname=localStorage.getItem('name');
      this.isLogged=true;
      this.rout.navigateByUrl('/profilelanding');
    }
    else
    {
      this.facebookbuttontext="Login with Facebook";
      this.googlebuttontext="Login with Google";
      this.loginname="";
    }
  }

  // googleloginfunction(){
  //   this.sub=this.auth.login("google").subscribe((data)=>{
  //     this.user = data;
  //     localStorage.setItem('name',this.user.name);
  //     localStorage.setItem("isLogged","true");
  //     console.log(this.user);
  //       Swal({
  //         title: 'Success',
  //         text: 'Your Logged in via Google',
  //         type: 'success',
  //         timer: 3000
  //       })
  //       this.rout.navigateByUrl('/profilelanding');
  //   })
  // }

  googleloginfunction(){
    this.sub=this.auth.login("google").subscribe((data)=>{
      this.user = data;
      localStorage.setItem('name',this.user.name);
      localStorage.setItem("isLogged","true");
      this.operations.login(this.user).subscribe((res:any)=> {
      console.log(res,"response for google login");
      console.log(res.data[0].customercode,"cc in local")
      localStorage.setItem('cc',res.data[0].customercode);
      localStorage.setItem('countrycode',res.data[0].countrycode);
      },(err)=> {
        console.log(err,"error");
      });
        // Swal({
        //   title: 'Success',
        //   text: 'Your Logged in via Google',
        //   type: 'success',
        //   timer: 3000
        // })
        this.rout.navigateByUrl('/profilelanding');
    })
  }


  logging(credentials) {
    console.log(credentials,"login credentials");
    this.operations.login(credentials).subscribe((res:any) => {
      console.log(res,"response of login");

    console.log(res.data[0].name,"is this the name?");
    localStorage.setItem('name',res.data[0].name);
    localStorage.setItem("isLogged","true");
    localStorage.setItem("token",res.token);
    localStorage.setItem("cc",res.data[0].customercode);
    localStorage.setItem("countrycode",res.data[0].countrycode);
    localStorage.setItem("regioncode",res.data[0].regioncode);
      // Swal({
      //     title: 'Congrats',
      //     text: 'Login Successful!',
      //     type: 'success',
      //     timer: 3000
      //   })
      this.rout.navigateByUrl('/profilelanding');

    },(err)=> {
      console.log(err,"response of error");
      Swal({
          title: 'Error',
          text: err.error.message,
          type: 'error',
          timer: 1500
        })
    })
  }

  
}
