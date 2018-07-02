import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lightbox',
  templateUrl: './lightbox.component.html',
  styleUrls: ['./lightbox.component.css']
})
export class LightboxComponent implements OnInit {
public slideIndex = 1;
  constructor() { }

  ngOnInit() {
  	console.log("yes");
       
    this.showSlides(this.slideIndex);

        
       

  }

  
  		 
         showSlides(n) {
          var i;
          var slides = document.getElementsByClassName("mySlides");
          var dots = document.getElementsByClassName("demo");
          
          if (n > slides.length) {this.slideIndex = 1}
          if (n < 1) {this.slideIndex = slides.length}
          for (i = 0; i < slides.length; i++) {
              
              slides[i].classList.remove("mystyle");
          }
          for (i = 0; i < dots.length; i++) {
              dots[i].className = dots[i].className.replace(" active", "");
          }
          slides[this.slideIndex-1].classList.add("mystyle");
          dots[this.slideIndex-1].className += " active";
          
        }
        plusSlides(n) 
        {
          
          this.showSlides(this.slideIndex += n);
        }
        currentSlide(n) {
          this.showSlides(n);
        }


  	
}
