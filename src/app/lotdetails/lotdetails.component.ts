import { Component, OnInit } from '@angular/core';
import { OperationsService } from '../operations.service';
import { ActivatedRoute } from "@angular/router";
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from '../auth.service';
import Swal from 'sweetalert2';
declare var jquery:any;
declare var $ :any;
@Component({
  selector: 'app-lotdetails',
  templateUrl: './lotdetails.component.html',
  styleUrls: ['./lotdetails.component.css']
})
export class LotdetailsComponent implements OnInit {
  public params: any ;
  public params2:any;
  public data: any;
  public lastPrices : any;
  public data_id:any;
  public thisurl;
  public fbshare;
  public slideIndex = 1;
  public imageArray:any =[];
  public auction_image:string;
  public major:string;
  public offer_full:any;
  public country:any = [];
  public offer_full_new:any;

  constructor(public operations:OperationsService,private route: ActivatedRoute,public spinner:NgxSpinnerService,public service:AuthService) { 
  	
  }

  ngOnInit() {
    this.countries();
    this.thisurl = window.location.href;
    this.fbshare = "https://www.facebook.com/sharer/sharer.php?u="+ this.thisurl +"%2Fdocs%2Fplugins%2F&amp;src=sdkpreparse";
    console.log(this.fbshare,"fb share");
    this.route.params.subscribe( params => {
      this.params = params.data1;
      this.params2 = params.data2;
      console.log(this.params,"params here");
      if(this.params!=undefined)
      {
        localStorage.setItem('id',this.params);
        localStorage.setItem('bid',this.params2);
        console.log("id saved");
        
      }
      else
      {
        console.log("id NOT SAVED");
      }
      
      this.data_id = localStorage.getItem('id'); 


      });
    this.productDetail(this.data_id);


    }
    productDetail(id) {
      this.operations.product(id).subscribe((res:any)=> {
      	console.log(res.data,"data");
        this.data = res.data[0][0];
        this.imageArray = this.data.IMAGES.split('#');
        this.auction_image = this.imageArray[0];
        this.imageArray.shift();
        this.major=this.imageArray[0];
        console.log(this.imageArray,"this.imageArray");
		    let temp = res.data[0][0].AVG_STRING.split(',');
		    temp = temp.map((amount) => amount*1000);
        this.lastPrices = temp.join(',').replace(/,/g, '\n');
        console.log(this.lastPrices, "lastPrices");
        localStorage.setItem('kuzov',this.data.KUZOV);

      })
    }
  sendemail(data)
  {
    console.log(data, "received from modal");
    this.operations.send_email(data).subscribe((res:any)=>{
      $('#myModal').modal('hide');
      Swal({
              title: 'Success',
              text: 'Link Shared Via Email',
              type: 'success',
              timer: 4000
            })
     // console.log(res, "response from API for sending email");
    });

    // this.spinner.show();
    // this.service.sendemail(data).subscribe((res:any)=>{
    //   console.log(res.status,"response from API");
    //   if(res.status==true)
    //   {
    //     this.spinner.hide();
    //     $('.modal').hide();
    //     $('body').removeClass('modal-open');
    //     $('.modal-backdrop').remove();
    //     Swal({
    //       title: 'Success',
    //       text: 'The Link to this product is sent',
    //       type: 'success',
    //       timer: 3000
    //     })
    //   }
    //   else
    //   {
    //     this.spinner.hide();
    //     $('.modal').hide();
    //     $('body').removeClass('modal-open');
    //     $('.modal-backdrop').remove();
    //     Swal({
    //       title: 'Error',
    //       text: 'Something Went Wrong, Try Later',
    //       type: 'error',
    //       timer: 3000
    //     })
    //   }
    // })
    // console.log(data,"in TS file");
  }

  showSlides(n) {
    console.log("showslides",n)
    var i;
    var slides = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("demo");
    console.log("showslides length",slides.length)
    if (n > slides.length) {this.slideIndex=1}
    if (n < 1) {this.slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
        
        slides[i].classList.remove("mystyle");
        slides[i].classList.add("none");
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    console.log("slideindex",this.slideIndex,n)
    slides[n-1].classList.remove("none");
    slides[n-1].classList.add("mystyle");
    dots[n-1].className += " active";
    
  }
  showSlidesarrow(n) {
    console.log("showslides",n)
    var i;
    var slides = document.getElementsByClassName("mySlides");
    var dots = document.getElementsByClassName("demo");
    console.log("showslides length",slides.length)
    if (n > slides.length) {this.slideIndex=1}
    if (n < 1) {this.slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
        
        slides[i].classList.remove("mystyle");
        slides[i].classList.add("none");
    }
    for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }
    console.log("slideindex",this.slideIndex,n)
    slides[this.slideIndex-1].classList.remove("none");
    slides[this.slideIndex-1].classList.add("mystyle");
    dots[this.slideIndex-1].className += " active";
    
  }

  plusSlides(n) 
  {
    this.showSlidesarrow(this.slideIndex += n);
  }
  currentSlide(n) {
    console.log(n+1,"index");
    
    this.showSlides(n+1);
    
  }

  imageSpilit(){
    // for(var i=0;i<this.alldata.length;i++){
    //   var imageArray=this.alldata[i].IMAGES.split('#');
    //   this.alldata[i].images=imageArray
    // }
  }
  offermade(data)
  {
    
    var cc=localStorage.getItem("cc");
    console.log(cc, "offer CC");
    if(cc==null)
    {
      Swal({
        title: 'Error',
        text: 'Please login/register to make an offer',
        type: 'error',
        timer: 5000
      })
    }
    
    else
    {

      var name = localStorage.getItem("name");
      var cc = localStorage.getItem("cc");
      this.offer_full=this.data;
      // //adding extra data
      this.offer_full.offer=data.offer;
      this.offer_full.cc=cc
      var currentTime = new Date();
      this.offer_full.offerdate=currentTime;
      this.offer_full.state="pending";
      this.offer_full.name=name;
      this.offer_full.bid=this.data.LOT;
      var countrycode = localStorage.getItem("countrycode");
      if(countrycode == "")
      {
        $('#countrymodal').modal('show');
      }
      else
      {
        var username = localStorage.getItem("name");
        var ccode = localStorage.getItem("cc");
        this.offer_full.countrycode = localStorage.getItem("countrycode");
        console.log(this.offer_full,"to send for make offer");
        this.spinner.show();
        //rate, customer_name,model,amount,year,country,make,mileage

       // 
       console.log(this.data,"all data this tis hits");
       this.offer_full_new=new Object();
       this.offer_full_new.name = username;
       this.offer_full_new.cc=ccode;
        this.offer_full_new.model=this.data.MODEL_NAME;
        this.offer_full_new.amount=this.data.offer;
        this.offer_full_new.year=this.data.YEAR;
        this.offer_full_new.country = localStorage.getItem("countrycode");
        this.offer_full_new.make = this.data.MARKA_NAME;
        this.offer_full_new.mileage = this.data.MILEAGE;
        this.offer_full_new.rate = this.data.RATE;

        console.log(this.offer_full_new, "offer_full_new");
        this.operations.makeoffer(this.offer_full_new,cc,this.data.LOT).subscribe((res:any)=>{
        this.spinner.hide();
          console.log(res,"response from API for makeoffer");
          Swal({
            title: 'success',
            text: "bid placed",
            type: 'success',
            timer: 9500
          })
        },(err)=>{
          Swal({
            title: 'Sorry',
            text: "Maximum Chances Reached",
            type: 'error',
            timer: 9500
          })
        })
      }

      
      // console.log(this.data.LOT,"see if bid is here or not");

      // //offer_full has all the data required for offer page
      // this.operations.makeoffer(this.offer_full).subscribe((res:any)=>{
      //   console.log(res,"PAI HIT for make offer is here");
      //   if(res.success==1 )
      //   {
      //     Swal({
      //       title: 'success',
      //       text: res.message,
      //       type: 'success',
      //       timer: 3000
      //     })
      //   }
      //   else
      //   {
      //     Swal({
      //       title: 'error',
      //       text: res.message,
      //       type: 'error',
      //       timer: 3000
      //     })
      //   }
      // },(err)=> {
      //   console.log(err,"response of error");
      //   Swal({
      //       title: 'Error',
      //       text: err.statusText,
      //       type: 'error',
      //       timer: 3500
      //     })
      // })
    }
  }
  countries() {
    this.operations.countryList().subscribe((res:any) => {
      this.country = res.data;
    },(err) => {
      console.log(err,"error");
    })
  }
  addcountry(data)
  {
    var cc = localStorage.getItem("cc");
    console.log(cc,"Customer Code");
    console.log(data, "COUNTRY CODE");
    
  }
}
