import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { IAppState } from '../../../interfaces/app-state';
import { HttpService } from '../../../services/http/http.service';
import { TCModalService } from '../../../ui/services/modal/modal.service';
import { IUser } from '../../../ui/interfaces/user';
import { environment } from '../../../env';
import { BasePageComponent } from '../../../pages/base-page';
import {ActivatedRoute, Router} from "@angular/router";
// import {TokenPayload, UserService} from "../services/user.service";
import { NotificationService } from '../notification/notification.service';

@Component({
  selector: 'login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent extends BasePageComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  @ViewChild('modalBody', { static: true }) modalBody: ElementRef<any>;
  @ViewChild('modalFooter', { static: true }) modalFooter: ElementRef<any>;
  verificationstr:any;
  public API_URL:any = environment.backend;
  constructor(
    store: Store<IAppState>,
    httpSv: HttpService,
    private fb: FormBuilder, 
    private modal: TCModalService,
    private formBuilder: FormBuilder,
    private actroute: ActivatedRoute,
    private notifyService : NotificationService,
    private router: Router,
  ) {
    super(store, httpSv);
    }

  ngOnInit() {
    
    var data = localStorage.getItem('user');
    if(data != null){
      this.router.navigateByUrl('/vertical/default-dashboard');
    }else{
      this.verificationstr = this.actroute.snapshot.paramMap.get('id');
      if(this.verificationstr){
        
    this.activatemail(this.verificationstr);
      }
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
    }

  }

  activatemail(userid){
      this.httpSv.postCall(this.API_URL+'user-activate/',{'userid':userid}).subscribe(response => {
        if(response.status == 200){
          this.router.navigateByUrl('/public/sign-in');
        }
      });
  }
  login(){
    if(this.loginForm.valid){
      this.httpSv.postCall(this.API_URL+'user-login/',this.loginForm.value).subscribe(response => {
        if(response.status == 200){
          localStorage.setItem('user', JSON.stringify(response.updatedata));
          this.notifyService.showSuccess('', response.message);
          this.router.navigateByUrl('/vertical/edit-account');
        }
      }, (err) => {
        this.notifyService.showError('', err.message);
    })
    }
  }
}
