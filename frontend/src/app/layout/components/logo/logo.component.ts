import { Component, OnDestroy,HostBinding, Input, OnInit } from '@angular/core';
import { environment } from '../../../env';
import { BasePageComponent } from '../../../pages/base-page';
// import { HttpService } from '../../../../services/http/http.service';
import { HttpService } from '../../../services/http/http.service';
import { Store } from '@ngrx/store';
// import { IAppState } from '../../../../interfaces/app-state';
import { IAppState } from '../../../../app/interfaces/app-state';
@Component({
  selector: 'logo',
  templateUrl: 'logo.component.html',
  styleUrls: ['logo.component.scss']
})
export class LogoComponent extends BasePageComponent implements OnInit, OnDestroy {
  @HostBinding('class.logo') true;
  @Input() src: string;
  @Input() width: number | string;
  @Input() height: number | string;
  @Input() alt: string;
  userData:any;
  public API_URL:any = environment.backend;
  hospitalId:any=[];
  // constructor(
  //   store: Store<IAppState>,
  //   httpSv: HttpService
  // ) {
  //   this.width = 'auto';
  //   this.height = 'auto';
  //   this.alt = '';
  //    super(store, httpSv);
  // }

  ngOnInit() {
    super.ngOnInit();
    this.hospitalId =JSON.parse(localStorage.getItem('user')).id;
    this.httpSv.getData(this.API_URL+'account-get/'+this.hospitalId).subscribe(response => {
      console.log(response);
      console.log('sdfsdfsdfsdfsdf');
      this.userData = response[0]

    });
  }
}
