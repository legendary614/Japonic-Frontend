import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { ProductComponent } from './product/product.component';
import { LotdetailsComponent } from './lotdetails/lotdetails.component';
import { StatsComponent } from './stats/stats.component';
import { OffersComponent } from './offers/offers.component';
import { ChatComponent } from './chat/chat.component';
import { InvoicesComponent } from './invoices/invoices.component';
import { PicturesComponent } from './pictures/pictures.component';
import { StateComponent } from './state/state.component';
import { RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FormsModule } from '@angular/forms';
import { SignupComponent } from './signup/signup.component';
import { SearchComponent } from './search/search.component';
import { AuthService } from './auth.service';
import { OperationsService } from './operations.service';
import { HttpClientModule } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';
import { LightboxComponent } from './lightbox/lightbox.component';
import { Angular2SocialLoginModule } from 'angular2-social-login';
import { ConfirmationComponent } from './confirmation/confirmation.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ProfileLandingComponent } from './profile-landing/profile-landing.component'; // <-- import the module
import { MyDatePickerModule } from 'mydatepicker';
import { MycarsComponent } from './mycars/mycars.component';
import { TotalchatComponent } from './totalchat/totalchat.component';

let socialloginproviders={
  "facebook":{
    "clientId":"1987589354884403",
    "apiVersion":"v2.11"
  },

  //live
  "google":{
    "clientId":"1092610543742-0nt0orhgi7qlnrv288rc6u9vms8quqge.apps.googleusercontent.com",
    "clientSecret":"Ber06H7DS0kbxodkrFtev5kT"
  }


  // //localhost
  // "google":{
  //   "clientId":"945037261582-ln472m3s1v3d8vntfcq1r5qqrhlhvue0.apps.googleusercontent.com",
  //   "clientSecret":"OpxSAcKiYyJA_1FFzX_dVxu7"
  // }

};
const rout=[
  {
    path:"mycars",
    component:MycarsComponent
  },
  {
    path:"profilelanding",
    component:ProfileLandingComponent
  },
  {
    path:"login",
    component:LoginComponent
  },
  {
    path:"",
    component:HomeComponent
  },
  {
    path:"home",
    component:HomeComponent
  },
  {
    path:"signup",
    component:SignupComponent
  },
  {
    path:"confirmation",
    component:ConfirmationComponent
  },
 
  {
    path:"product",
    component:ProductComponent,
    children:[
    
      {
         path: 'lot_details/:data1/:data2', component: LotdetailsComponent
      },
      {
        path: 'lot_details/mychat',component :ChatComponent
      },
      {
        path: 'lot_details/:data1/:data2/mychat',component:ChatComponent
      },
      {
        path: 'chat/mychat',component:ChatComponent
      },
      {
        path: 'lot_details', component: LotdetailsComponent
     },
      {
        path: 'stats', component: StatsComponent
      },
      {
        path: 'offers', component: OffersComponent
      },
      {
        path: 'chat', component: TotalchatComponent
      },
      {
        path: 'invoices', component: InvoicesComponent
      },
      {
        path: 'pictures', component: PicturesComponent
      },
      {
        path: 'state', component: StateComponent
      }
    ]
  }

]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    HomeComponent,
    SignupComponent,
    SearchComponent,
    ProductComponent,
    LotdetailsComponent,
    StatsComponent,
    OffersComponent,
    ChatComponent,
    InvoicesComponent,
    PicturesComponent,
    StateComponent,
    LightboxComponent,
    ConfirmationComponent,
    ProfileLandingComponent,
    MycarsComponent,
    TotalchatComponent,
   
  ],
  imports: [
    BrowserModule,
    FormsModule,
    Angular2SocialLoginModule,
    HttpClientModule,
    NgxSpinnerModule,
    NgxPaginationModule,
    MyDatePickerModule ,
    RouterModule.forRoot(rout),
  ],
  providers: [AuthService,OperationsService],
  bootstrap: [AppComponent],
  
})
export class AppModule { }
Angular2SocialLoginModule.loadProvidersScripts(socialloginproviders);