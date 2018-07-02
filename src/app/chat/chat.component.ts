import { Component, OnInit } from '@angular/core';
import { AuthService,productDetails } from '../auth.service'; //ALL API HITS LIVES HERE
import { OperationsService,searchParams } from '../operations.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  constructor(public service:AuthService, public spinner:NgxSpinnerService, public operations: OperationsService,public router: Router) { }
  public cc;
  public bid;
  public customercountrycode;
  public customerregioncode;
  public fullchatdetails;
  public note;
  public mychathistory;
  public myquestion;
  ngOnInit() {
    this.cc=localStorage.getItem("cc");
    this.bid=localStorage.getItem("bid");
    this.customercountrycode=localStorage.getItem("countrycode");
    this.customerregioncode=localStorage.getItem("regioncode");
    console.log(this.customercountrycode);
    console.log(this.customerregioncode);
    this.fullchat();
    this.chatHistory();

  }

  fullchat()
  {
    //shows all the chats when user clicks on chat
    this.operations.totalchat(this.cc,this.bid,this.customercountrycode,this.customerregioncode).subscribe((res:any)=>{
      console.log(res,"total chatttt");
      this.fullchatdetails=res;
      this.note=res.message;
    })
  }
  chatHistory()
  {
    this.operations.chatHistory(this.cc,this.bid).subscribe((res:any)=>{
      console.log(res,"chatHistory");
      this.mychathistory=res.data;
      
    })
  }

  chat(msg)
  {
    console.log(msg.msg,"msg body");
    var msgData ={
      message:msg.msg,
      customercountrycode:this.customercountrycode,
      customerregioncode:this.customerregioncode
  };

    this.operations.chat(this.cc,this.bid,msgData).subscribe((res:any)=>{
      console.log(res,"chatHistory");
      this.chatHistory();
    })
  }
}
