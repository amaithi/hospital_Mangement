import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { StoreModule } from '@ngrx/store';
import { en_US, NgZorroAntdModule, NZ_I18N } from 'ng-zorro-antd';

import { AppComponent } from './app.component';
import { ROUTES, RoutingModule } from './routing/routing.module';
import { LayoutModule } from './layout/layout.module';
import { UIModule } from './ui/ui.module';
import { PagesModule } from './pages/pages.module';
import { pageDataReducer } from './store/reducers/page-data.reducer';
import { appSettingsReducer } from './store/reducers/app-settings.reducer';
import { patientsReducer } from './store/reducers/patients.reducer';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { DatepickerFormatsExampleComponent } from './datepicker-formats-example/datepicker-formats-example.component';
// import { NewpaymentComponent } from './newpayment/newpayment.component';
 import { ToastrModule } from 'ngx-toastr';
 import { DatePipe } from '@angular/common';
 
@NgModule({
  declarations: [
    AppComponent,
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    RouterModule.forRoot(ROUTES),
    StoreModule.forRoot({
      pageData: pageDataReducer,
      appSettings: appSettingsReducer,
      patients: patientsReducer
    }),
    NgZorroAntdModule,
    RoutingModule,
    LayoutModule,
    UIModule,
    PagesModule,
    BsDatepickerModule.forRoot(),
     ToastrModule.forRoot()
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: NZ_I18N, useValue: en_US },
    DatePipe
  ],
  
  schemas: [  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
