import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OperationsService } from '../operations.service';
import Swal from 'sweetalert2';
declare var jquery:any;
declare var $ :any;
import { NgxSpinnerService } from 'ngx-spinner';
@Component({
  selector: 'app-totalchat',
  templateUrl: './totalchat.component.html',
  styleUrls: ['./totalchat.component.css']
})
export class TotalchatComponent implements OnInit {

  constructor(public operations:OperationsService,public router:Router) { }
  public cc;
  public bid;
  public customercountrycode;
  public customerregioncode;
  public fullchatdetails;
  ngOnInit() {
    this.cc=localStorage.getItem("cc");
    this.bid=localStorage.getItem("bid");
    this.customercountrycode=localStorage.getItem("countrycode");
    this.customerregioncode=localStorage.getItem("regioncode");
    this.fullchat();

  }
  fullchat()
  {
    //shows all the chats when user clicks on chat
    this.operations.totalchat(this.cc,this.bid,this.customercountrycode,this.customerregioncode).subscribe((res:any)=>{
      console.log(res,"total chatttt");
      this.fullchatdetails=res.data;
    })
  }
}
