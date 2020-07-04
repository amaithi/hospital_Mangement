import { Component, OnDestroy, OnInit } from '@angular/core';
import { BasePageComponent } from '../../../base-page';
import { Store } from '@ngrx/store';
import { IAppState } from '../../../../interfaces/app-state';
import { HttpService } from '../../../../services/http/http.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IOption } from '../../../../ui/interfaces/option';
import { environment } from '../../../../env';
@Component({
  selector: 'page-edit-account',
  templateUrl: './edit-account.component.html',
  styleUrls: ['./edit-account.component.scss']
})
export class PageEditAccountComponent extends BasePageComponent implements OnInit, OnDestroy {
  userInfo: any;
  userForm: FormGroup;
  gender: IOption[];
  status: IOption[];
  currentAvatar: string | ArrayBuffer;
  defaultAvatar: string;
  changes: boolean;
  hospitalId:any=[];
  userData:any=[];
  public API_URL:any = environment.backend;
  constructor(
    store: Store<IAppState>,
    httpSv: HttpService,
    private formBuilder: FormBuilder
  ) {
    super(store, httpSv);

    this.pageData = {
      title: 'Edit account',
      loaded: true,
      breadcrumbs: [
        {
          title: 'Apps',
          route: 'default-dashboard'
        },
        {
          title: 'Service pages',
          route: 'default-dashboard'
        },
        {
          title: 'Edit account'
        }
      ]
    };
    this.gender = [
      {
        label: 'Male',
        value: 'male'
      },
      {
        label: 'Female',
        value: 'female'
      }
    ];
    this.status = [
      {
        label: 'Approved',
        value: 'approved'
      },
      {
        label: 'Pending',
        value: 'pending'
      }
    ];
    this.defaultAvatar = 'assets/content/anonymous-400.jpg';
    this.currentAvatar = this.defaultAvatar;
    this.changes = false;
  }

  ngOnInit() {
    super.ngOnInit();
    this.hospitalId =JSON.parse(localStorage.getItem('user')).id;
    this.userForm = this.formBuilder.group({
      img: [this.currentAvatar],
      username: ['', Validators.required],
      alternumber: ['', Validators.required],
      ownername: ['', Validators.required],
      number: ['', Validators.required],
      address: ['', Validators.required]
    
    });
   // this.hospitalId ='';
    this.httpSv.getData(this.API_URL+'account-get/'+this.hospitalId).subscribe(response => {
      this.userData= response[0];
      this.userForm.get('alternumber').patchValue(this.userData.alternumber);
      this.userForm.get('ownername').patchValue(this.userData.ownername);
      this.userForm.get('number').patchValue(this.userData.number);
      this.userForm.get('address').patchValue(this.userData.address);
      this.userForm.get('username').patchValue(this.userData.username);
    });
   
    // this.getData('account-get/'+this.hospitalId, 'userInfo', 'loadedDetect');
  }
  get f() {
    return this.userData.controls;
  }
  ngOnDestroy() {
    super.ngOnDestroy();
  }

  // loadedDetect() {
  //   this.setLoaded();

  //   this.inituserForm(this.userInfo);
  // }

  // init form
  inituserForm(data: any) {
    setTimeout(() => {
    this.userForm = this.formBuilder.group({
      img: [this.currentAvatar],
      username: ['', Validators.required],
      alternumber: [ '', Validators.required],
      ownername: ['', Validators.required],
      number: ['', Validators.required],
      address: ['', Validators.required]
    
    });

    // detect form changes
    // this.userForm.valueChanges.subscribe(() => {
    //   this.changes = true;
    // });
  },1);
  }

  // save form data
  saveData(form: FormGroup) {
    if (form.valid) {
      

      this.httpSv.postData(this.API_URL+'account-update/',form.value).subscribe(response => {
        this.userData= response[0];
        this.inituserForm(this.userData);
      });
      this.userInfo = form.value;
      this.changes = false;
    }
  }

  // upload new file
  onFileChanged(inputValue: any) {
    let file: File = inputValue.target.files[0];
    let reader: FileReader = new FileReader();

    reader.onloadend = () => {
      this.currentAvatar = reader.result;
      this.changes = true;
    };

    reader.readAsDataURL(file);
  }
}
