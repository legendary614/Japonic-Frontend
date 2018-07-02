import { Component, OnInit } from '@angular/core';
import { OperationsService } from '../operations.service';
import { ActivatedRoute } from "@angular/router";
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
declare var jquery:any;
declare var $ :any;
@Component({
  selector: 'app-mycars',
  templateUrl: './mycars.component.html',
  styleUrls: ['./mycars.component.css']
})
export class MycarsComponent implements OnInit {
  public mycar_details:any;
  constructor(public operations:OperationsService,public router:Router) { }
  public mycardata:any;
  ngOnInit() {
   this.mycars();
  }

  mycars() {
    var cc = localStorage.getItem('cc');
    var name = localStorage.getItem("name");
    if(!name) {
      this.router.navigateByUrl('');
      Swal({
          title: 'Error',
          text: 'Please login first!',
          type: 'error',
          timer: 3000
        })
    }
    else{
      this.operations.mycars(cc).subscribe((res:any)=> {
      console.log(res,"my car response from API");
      this.mycar_details=res.data;
    },(err) => {
      console.log(err,"error on mycar data");
    })
    }
    
  }
  delete()
  {
    var cc = localStorage.getItem('cc');
    
  }

}
