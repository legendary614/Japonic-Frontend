import { Component, OnInit } from '@angular/core';
import { OperationsService } from '../operations.service';

import { Router } from '@angular/router';
import {IMyDpOptions} from 'mydatepicker';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

	public brands:any = [];
	public uniqueBrands:any = [];
	public models:any = [];
	public allDetails:any= [];
	public selected=true;
	public myDatePickerOptions: IMyDpOptions = {
		dateFormat: 'dd.mm.yyyy',
};
  constructor(public operations: OperationsService,public router:Router) { }

  ngOnInit() {
  	this.brandList();
  	this.allProducts();
  }

  brandList(){
      this.operations.allBrands().subscribe((res:any)=> {
        this.uniqueBrands = res.data;
        for(var i = 0; i< this.uniqueBrands.length; i++){    
           this.brands.push(this.uniqueBrands[i].name)   ;
           // this.navigation = this.brands; 
        }
      },
      (error)=> {
        console.log(error,"error message");
      })
    }

  selected_brand(brandName) {

   
		console.log(brandName.value,"selected brand");
		if(brandName.value)
    {
      this.selected=false;
    }
  	this.operations.models(brandName.value).subscribe((res:any)=> {
  		console.log(res.data);
  		this.models = res.data;
  		console.log(this.models,"corresponding models");
  	},(error)=> {
  		console.log(error,"error on fetching models corresponding to selected brands");
		})
		




			
		
	}
	

  allProducts() {
  	this.operations.allProducts().subscribe((res:any)=> {
  		console.log(res,"allProducts");
  		this.allDetails = res.data;
  		console.log(this.allDetails,"allDetails");
  	},(error)=> {
  		console.log(error,"error on fetching all data");
  	})
  }

  search(search_details) {
  	console.log(search_details,"search details");
  	// this.operations.searchedItems(search_details).subscribe((res: any)=> {
  	// 	console.log(res,"searchItems");
  	// 	this.allDetails = res.data;
  	// 	console.log(this.allDetails,"allDetails of searched Items");
  	// },
  	// (error)=> {
  	// 	console.log(error,"error on searched Items");
		// });
		

		//navigate to homepage with the data
		var brand = search_details.brand;
		var from_year = search_details.from_year;
		var to_year = search_details.to_year;
		var model = search_details.model;
		var auction;

		console.log(brand,from_year,to_year,model,auction);
		if(auction == undefined)
		{
			auction = ""
		}
		else
		{
			auction =  search_details.auction.formatted;
		}
		this.router.navigate(['/home'], { queryParams: { brand:brand,from_year:from_year,to_year:to_year,model:model,auction_date:auction } });
		
  }

}
