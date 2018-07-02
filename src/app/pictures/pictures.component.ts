import { Component, OnInit } from '@angular/core';
import { OperationsService } from '../operations.service';

import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-pictures',
  templateUrl: './pictures.component.html',
  styleUrls: ['./pictures.component.css']
})
export class PicturesComponent implements OnInit {
  public slideIndex = 1;
  public cc:any;
  public invoicedata:any;
  public havedata=false;
  public invoicedetails:any;
  public indexoffile:object;
  public data_array=[];
  public image_array=[];

  constructor(public operations:OperationsService,public rout:Router) { }

  ngOnInit() {
    this.getInvoices();
    console.log(this.image_array,"is this is file u r looking for? updated");
  }
  plusSlides(n) 
  {
    console.log("showSlides plus",n)
    this.showSlides(this.slideIndex += n);
  }
  currentSlide(n) {
    console.log(n,"index");
   
    this.showSlides(this.slideIndex = n);
    
  }
  currentSlideModal(n) {
    console.log(n,"index");
   
    this.showSlidesModal(this.slideIndex = n);
    
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
        dots[i].className = dots[i].className.replace("active", "");
    }
    console.log("slideindex",this.slideIndex,n)
    slides[this.slideIndex-1].classList.remove("none");
    slides[this.slideIndex-1].classList.add("mystyle");
    dots[this.slideIndex-1].className += " active";
    
  }
  showSlidesModal(n) {
    console.log("showslides",n)
    var i;
    var slides = document.getElementsByClassName("m_mySlides");
    var dots = document.getElementsByClassName("demo");
    console.log("showslides length",slides.length)
    if (n > slides.length) {this.slideIndex=1}
    if (n < 1) {this.slideIndex = slides.length}
    for (i = 0; i < slides.length; i++) {
        
        slides[i].classList.remove("mystyle");
        slides[i].classList.add("none");
    }
    
    console.log("slideindex",this.slideIndex,n)
    slides[this.slideIndex-1].classList.remove("none");
    slides[this.slideIndex-1].classList.add("mystyle");
    
    
  }
  	openModal() {
  	document.getElementById('myModal').style.display = "block";
	}

	closeModal() {
	  document.getElementById('myModal').style.display = "none";
	}

  getInvoices() {
  	this.cc = localStorage.getItem('cc');
    var bid = localStorage.getItem("bid");
  	this.operations.invoice(this.cc,bid).subscribe((res:any)=> {
      console.log(res,"lookk here");
      if(res.success==0)
      {
        Swal({
          title: 'warning',
          text: 'No Images Found',
          type: 'warning',
          timer: 3000
        })
        this.invoicedata="No Data Found";
        console.log(this.invoicedetails,"this is the invoice details needed to be shown");
        this.rout.navigateByUrl("product/lot_details");
      }
      else
      {
        
        var len = 0;
        for (var a in res.data) {
            len++;
        }
        
        console.log('Size of object: '+len);
        for(var i=0;i<len;i++)
        {
          var check=res.data[i].linktodocument;
         
          if ( check.match( /(jpeg|png|jpg|gif|bmp|webp|svg)/ ) ) {
            console.log("i found it at index ->",i);
            this.data_array.push({
              index:i
            })
            this.image_array.push({
              index:i,
              image:res.data[i].linktodocument
            });
          } else {
            console.log("sorryyy");
          }
        }
        console.log(this.data_array.length,"data_array length");
        // for(var z=0;z<this.data_array.length;z++)
        // {
        //   console.log("dist");
        //   this.image_array.push({
        //     index:this.data_array,
        //     doc:res.
        //   })
        // }
        
        
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
