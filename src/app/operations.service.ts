import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs/Rx'; 
import { environment } from '../environments/environment';

export interface searchParams {
  brand: string;
  model?: string;
}

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class OperationsService {
  private apiUrl: string = environment.apiUrl;

  constructor(public http:HttpClient) { }

  allBrands() {
    return this.http.get(this.apiUrl + "api/companies");
  }
  
  login(data) {
    console.log("inside login",data);
    return this.http.post(this.apiUrl+'query/login',data);
  }

  allProducts() {
    return this.http.get(this.apiUrl +"api/products");
  }

  models(brand_name) {
    return this.http.get(this.apiUrl +"api/models?company_name="+brand_name);
  }

  searchedItems(details) {
    console.log(details,"details");
    var date;
    if(details.auction.date){
      date = details.auction.date.year+"."+details.auction.date.month+"."+details.auction.date.day;
      
    }
    console.log(date,"date");
    var company_name_en = details.brand;
    var model_name_en = details.model;
    var modelYearFrom = details.from_year;
    var modelYearTo = details.to_year;

    if(!date) {
      return this.http.get(this.apiUrl +"api/lots?company_name_en="+company_name_en+"&model_name_en="+model_name_en+"&modelYearFrom="+modelYearFrom+"&modelYearTo="+modelYearTo);
    }
    else {
      return this.http.get(this.apiUrl +"api/lots?company_name_en="+company_name_en+"&model_name_en="+model_name_en+"&modelYearFrom="+modelYearFrom+"&modelYearTo="+modelYearTo+"&lot_date="+date);
    }
    
  }

  sidesearch(details) {
    console.log(details,"details");
    //var date;
    // if(details.auction.date){
    //   date = details.auction.date.year+"."+details.auction.date.month+"."+details.auction.date.day;
      
    // }
    //console.log(date,"date");
    var company_name_en = details.brand;
    var model_name_en = details.model;
    var modelYearFrom = details.from_year;
    var modelYearTo = details.to_year;

    // if(!date) {
      return this.http.get(this.apiUrl +"api/lots?company_name_en="+company_name_en+"&model_name_en="+model_name_en+"&modelYearFrom="+modelYearFrom+"&modelYearTo="+modelYearTo);
    // }
    // else {
    //   return this.http.get(this.apiUrl +"api/lots?company_name_en="+company_name_en+"&model_name_en="+model_name_en+"&modelYearFrom="+modelYearFrom+"&modelYearTo="+modelYearTo+"&lot_date="+date);
    // }
    
  }

  sidebarData() {
    return Observable.forkJoin(
        this.http.get(this.apiUrl +'api/modelData?index=0&upperLimit=250'),
        this.http.get(this.apiUrl +'api/modelData?index=250&upperLimit=250'),
        this.http.get(this.apiUrl +'api/modelData?index=500&upperLimit=250'),
        this.http.get(this.apiUrl +'api/modelData?index=750&upperLimit=250'),
        this.http.get(this.apiUrl +'api/modelData?index=1000&upperLimit=250'),
        this.http.get(this.apiUrl +'api/modelData?index=1250&upperLimit=250'),
        this.http.get(this.apiUrl +'api/modelData?index=1500&upperLimit=250'),
        this.http.get(this.apiUrl +'api/modelData?index=1750&upperLimit=250')
        );
  }

  product(id) {
    return this.http.get(this.apiUrl + "api/details?id='"+id+"'");
  }

   statsData(kuzov,year) {
     console.log(kuzov,"kuzov");
     console.log(year,"year");
       return Observable.forkJoin(
        this.http.get(this.apiUrl +'api/stats?KUZOV='+kuzov+'&year='+year+'&lmile=0&umile=150000&status=sold'),
        this.http.get(this.apiUrl +'api/stats?KUZOV='+kuzov+'&year='+year+'&lmile=25000&umile=50000&status=sold'),
        this.http.get(this.apiUrl +'api/stats?KUZOV='+kuzov+'&year='+year+'&lmile=50000&umile=75000&status=sold'),
        this.http.get(this.apiUrl +'api/stats?KUZOV='+kuzov+'&year='+year+'&lmile=75000&umile=100000&status=sold'),
        this.http.get(this.apiUrl +'api/stats?KUZOV='+kuzov+'&year='+year+'&lmile=100000&umile=125000&status=sold'),
        this.http.get(this.apiUrl +'api/stats?KUZOV='+kuzov+'&year='+year+'&lmile=125000&umile=150000&status=sold')
        );
    }

    countryList() {
      return this.http.get(this.apiUrl+'query/countries');
    }
    regionList(countrycode) {
      return this.http.get(this.apiUrl+'query/region?country='+countrycode);
    }

    offersInfo(customerCode,bid)
    {
      console.log(customerCode,"cc");
      var token = localStorage.getItem('token');
      return this.http.get(this.apiUrl+'query/offers?cc='+customerCode+"&bid="+bid,{headers: new HttpHeaders({ 'Authorization': 'Bearer '+token })});
    }

    invoice(customerCode, bid)
    {
      return this.http.get(this.apiUrl+'query/invoices?cc='+customerCode+"&bid="+bid)
    }
    states(customerCode, bid) {
      return this.http.get(this.apiUrl+'query/state?cc='+customerCode+"&bid="+bid);
    }




    makeoffer(data,cc,bid)
    {
      //
      console.log(data,"=>main data");
      console.log(cc,"=>cc");
      console.log(bid,"=>bid");
      return this.http.post(this.apiUrl+'query/makeoffer?cc='+cc+"&bid="+bid,data);
    }







    deletemyoffer(cc,bid,id)
    {
      return this.http.get(this.apiUrl+'query/deleteoffer?cc='+cc+"&bid="+bid+"&id="+id);

    }
    mycars(cc)
    {
      return this.http.get(this.apiUrl+'query/accepted?cc='+cc);
    }
    send_email(data)
    {
      return this.http.post(this.apiUrl+'query/share',data);
    }

    totalchat(cc,bid,customercountrycode,customerregioncode)
    {
      return this.http.get(this.apiUrl+'query/totalchat?bid='+bid+'&customercountrycode='+customercountrycode+"&customerregioncode="+customerregioncode);
    }
    chatHistory(cc,bid)
    {
      return this.http.get(this.apiUrl+'query/chatHistory?cc='+cc+"&bid="+bid);
    }

    chat(cc,bid,data)
    {
      return this.http.post(this.apiUrl+'query/chat?cc='+cc+"&bid="+bid,data);
    }

    savecountry(data)
    {
      return this.http.post(this.apiUrl+'query/savecountry',data);
    }
  
}

