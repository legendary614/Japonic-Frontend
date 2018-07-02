import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

import { Router } from '@angular/router';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(public rout:Router) { }
  public username="";
  public toggle=false;
  ngOnInit() {
    this.username=localStorage.getItem('name');
    if(this.username==null)
    {
      this.toggle=false;
    }
    else
    {
      this.toggle=true;
    }
    console.log(this.toggle,"toggle");
    console.log(this.username,"username");
  }
  logout()
  {
    localStorage.clear();
    console.log("local storage cleared");
    Swal({
      title: 'Success',
      text: "Successfully Logged OUT",
      type: 'success',
      timer: 300
    })
    window.location.reload();
    this.rout.navigate(['']);
  }

}
