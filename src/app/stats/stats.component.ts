import { Component, OnInit } from '@angular/core';
import { OperationsService } from '../operations.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {
	public data_kuzov:any;
	public year = 2005;
	statistics = [];
	uniqueRatings = [];
  constructor(public operations:OperationsService) { }

  ngOnInit() {
  	this.data_kuzov= localStorage.getItem('kuzov');
  	console.log(this.data_kuzov,"data_id");
  	this.statisticsData(this.data_kuzov,this.year);
  }

  calculate(key,array){
  	 var average = [];
  	 for(let i=0; i< array.length;i++){
  	 	
  	 	if(array[i].RATE == key){
  	 		average.push(parseInt(array[i].FINISH));
  	 	}
  	 }
  	 var sum = average.reduce((a, b) => a + b, 0);
  	//console.log(key,sum,"console.log(allRatings);");
  	 return sum;
  	 
  }

  statisticsData(kuzov,year) {
  	this.statistics = [];
  	if(!year){
  		year = 2000 ;
  	}
  	var rateName = "";
  	var ratingInner = [];
  	var allData = [];
  	this.operations.statsData(kuzov,year).subscribe((res:any) => {
  			for(let i=0; i< res.length;i++){
				var ratingsArr = [];
				var allRatings = [];
				for(let j=0; j< res[i].data[0].length;j++){
					var RatingName = res[i].data[0][j].RATE;
					if(RatingName){
						if(this.uniqueRatings.indexOf(RatingName) < 0 ){
							this.uniqueRatings.push(RatingName);
						}
						if(ratingsArr.indexOf(RatingName) < 0 ){
	             			ratingsArr.push(RatingName);	             			
	             				var result = this.calculate(RatingName,res[i].data[0]);
	                            //allRatings[RatingName] = result;
	                            allRatings.push({rate:RatingName,result:result});
				     	}
	             	}	
				}
				allData.push(allRatings)
            }
			for(let i=0; i< this.uniqueRatings.length;i++){
					var arr = [];
					var sum = 0;
					var count = 0;
				for(let j=0; j< allData.length; j++){
					var check = true;
					for(let k=0; k< allData[j].length;k++){
						if(allData[j][k].rate == this.uniqueRatings[i]){
							arr.push({mil:allData[j][k].result});
							sum = sum + allData[j][k].result;
							count++;
							var check = false;
						} 								
					}
					if(check) arr.push({mil:"***"});
				}
				var average = sum/count;
				arr.push({mil:average});
				this.statistics.push({rate: this.uniqueRatings[i],data:arr});
			}
			
  	},(err)=> {
  		console.log(err,"error on stats");
  	})
  }

  setYear(year) {
  	this.year = year;
  	console.log(year);
  	this.statisticsData(this.data_kuzov,this.year);
  }

}
