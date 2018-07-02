import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OperationsService } from '../operations.service';
import Swal from 'sweetalert2';
declare var jquery:any;
declare var $ :any;
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-offers',
  templateUrl: './offers.component.html',
  styleUrls: ['./offers.component.css']
})
export class OffersComponent implements OnInit {
  public myoffers:any;

  constructor(public operations:OperationsService,public router:Router) { }
  public offerdata:any;
  ngOnInit() {
   this.getOffers();
  }

  getOffers() {
    var cc = localStorage.getItem('cc');
    var name = localStorage.getItem("name");
    var bid = localStorage.getItem("bid");
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
      this.operations.offersInfo(cc,bid).subscribe((res:any)=> {
      console.log(res,"offersData, TO BE SHOWN IN THIS PAGEEEE");
      this.myoffers=res.data;
    },(err) => {
      console.log(err,"error on offer data");
    })
    }
    
  }
  delete(id)
  {
    console.log("delete clicked");
    var cc = localStorage.getItem('cc');
    var bid = localStorage.getItem("bid");
    console.log(cc,bid,'cc bid')
    var id = id;
    console.log(cc);
    console.log(bid);
    console.log(id);
    this.operations.deletemyoffer(cc,bid,id).subscribe((res:any)=>{
      //console.log(res,"API RESPONSE FOR DELETE MY OFFER");
      this.getOffers();
      Swal({
        title: 'Success',
        text: 'Bid Cancelled',
        type: 'success',
        timer: 4000
      })
    },(err)=>{
      Swal({
        title: 'Error',
        text: 'Something Went Wrong',
        type: 'warning',
        timer: 4000
      })
      console.log(err,"err for delete myoffer");
    })

  }

}
