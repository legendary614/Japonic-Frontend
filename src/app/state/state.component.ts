import { Component, OnInit } from '@angular/core';
import { OperationsService } from '../operations.service';

import Swal from 'sweetalert2';
@Component({
  selector: 'app-state',
  templateUrl: './state.component.html',
  styleUrls: ['./state.component.css']
})
export class StateComponent implements OnInit {
  public cc:any;
  public stateinfo:any;
  constructor(public service:OperationsService) { }

  ngOnInit() {
    this.cc=localStorage.getItem("cc");
    console.log(this.cc ,"  <= this is the cc of the logged in user");
    this.getstateinfo();
  }
  getstateinfo()
  {
    var bid = localStorage.getItem("bid");
    this.service.states(this.cc,bid).subscribe((res:any)=>{
      console.log(res,"states info is here");
      if(res.success==1)
      {
        console.log("STATES HAVE WON");
        this.stateinfo=res.data;
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
