import { Component, OnDestroy, OnInit ,Inject } from '@angular/core';
import { BasePageComponent } from '../../../base-page';
import { Store } from '@ngrx/store';
import { IAppState } from '../../../../interfaces/app-state';
import { HttpService } from '../../../../services/http/http.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IOption } from '../../../../ui/interfaces/option';
import { environment } from '../../../../env';
import {ActivatedRoute, Router} from "@angular/router";
import { DOCUMENT } from '@angular/common';
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
  autocompleteData: string[];
  selectData: IOption[];
  spealistDropDown:any=[];
  selectedSpealist:any=[]
  public API_URL:any = environment.backend;

  dropdownList = [];
    selectedItems = [];
    dropdownSettings = {};
  constructor(
    store: Store<IAppState>,
    httpSv: HttpService,
    private formBuilder: FormBuilder,
    private router: Router,
    @Inject(DOCUMENT) private _document: Document
  ) {
    
    super(store, httpSv);
    this.autocompleteData = [];
    this.selectData = [];
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
    this.getData('assets/data/autocomplete.json', 'autocompleteData');
    this.getData('assets/data/options.json', 'selectData');
    this.hospitalId =JSON.parse(localStorage.getItem('user')).id;
    this.userForm = this.formBuilder.group({
      img: [this.currentAvatar],
      specialists:[{}],
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
      this.userForm.get('img').patchValue(this.userData.img);
      this.userForm.get('specialists').patchValue(this.userData.specialists);
      this.userForm.controls.specialists.setValue(this.userData.specialists) 
      this.currentAvatar = this.userData.img ? this.userData.img :  this.currentAvatar;
      this.selectedSpealist = this.userData.specialists
    });
    this.httpSv.getData(this.API_URL+'doctorsspecialists/').subscribe(response => {
      this.spealistDropDown= response;
     
     
    });
   
    // this.getData('account-get/'+this.hospitalId, 'userInfo', 'loadedDetect');
  }
  get f() {
    return this.userData.controls;
  }
  selectItem(val){
    console.log(val)
  }
  removeItem(item){
    this.selectedSpealist.splice(item,1)
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
      img: [data.img ? data.img : this.currentAvatar],
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
      
      var temp =[];
      var req= form.value;
      var jointArray = [...form.value.specialists, ...this.selectedSpealist]

      // form.value.specialists.forEach(function(val){
      //   var obj={"label":'',"value":''};
      //   obj.value = val; obj.label=val; temp.push(obj)
      // });
      req.specialists = [...new Set([...jointArray])];
      this.httpSv.postData(this.API_URL+'account-update/',req).subscribe(response => {
        this.userData= response[0];
        this.inituserForm(this.userData);
        this.router.navigateByUrl('/vertical/default-dashboard');
        this._document.defaultView.location.reload();
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
      this.userForm.get('img').patchValue(this.currentAvatar);
      this.changes = true;
    };

    reader.readAsDataURL(file);
  }
  
}
