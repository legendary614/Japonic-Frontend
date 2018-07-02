import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable'; 
import { environment } from '../environments/environment';

export interface productDetails {
  MARKA_NAME: string,
  MODEL_NAME: string,
  GRADE: string,
  MILEAGE: string,
  YEAR: string
}

@Injectable()
export class AuthService {

  private apiUrl: string = environment.apiUrl;

  constructor(public http:HttpClient) { }

  getAllAuctionData(): Observable<any>{
    return this.http.get("https://japonic-api.herokuapp.com/auction");
  }
  sendemail(data)
  {
    return this.http.post("sendmail_api",data); //SEND MAIL API HERE
  }
  signup(userDetails) 
  {
    return this.http.post(this.apiUrl +'query/registeration',userDetails);
  }
}
