import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { IAppState } from '../../../interfaces/app-state';
import { HttpService } from '../../../services/http/http.service';
import { TCModalService } from '../../../ui/services/modal/modal.service';
import { IUser } from '../../../ui/interfaces/user';
const API_URL = 'http://localhost:5001/api/';
import { BasePageComponent } from '../../../pages/base-page';
import { NotificationService } from '../notification/notification.service';
@Component({
  selector: 'register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.scss']
})
export class RegisterFormComponent extends BasePageComponent implements OnInit, OnDestroy {
  registerForm: FormGroup;
  @ViewChild('modalBody', { static: true }) modalBody: ElementRef<any>;
  @ViewChild('modalFooter', { static: true }) modalFooter: ElementRef<any>;
  
  
  constructor(
    store: Store<IAppState>,
    httpSv: HttpService,
    private fb: FormBuilder, 
    private modal: TCModalService,
    private formBuilder: FormBuilder,
    private notifyService : NotificationService,
  ) {
    super(store, httpSv);
    }

  ngOnInit() {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }
  
  signup(){
    if(this.registerForm.valid){
      this.httpSv.signupAPI(API_URL+'user-save/',this.registerForm.value).subscribe(response => {
        console.log(response)
        this.notifyService.showSuccess('', response.message);
      }, (err) => {
        this.notifyService.showError('', err.message);
    })
  
    }
  }
}
