import { Component, OnDestroy, OnInit, Inject  } from '@angular/core';

import { Store } from '@ngrx/store';
import {ActivatedRoute, Router} from "@angular/router";
import { BasePageComponent } from '../../base-page';
import { IAppState } from '../../../interfaces/app-state';
import { HttpService } from '../../../services/http/http.service';
import { IPatient } from '../../../interfaces/patient';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IOption } from '../../../ui/interfaces/option';
import { Content } from '../../../ui/interfaces/modal';
import * as PatientsActions from '../../../store/actions/patients.actions';
import { TCModalService } from '../../../ui/services/modal/modal.service';
import { DatePipe } from '@angular/common';
import { environment } from '../../../env';
import { DOCUMENT } from '@angular/common';
// import { IMyOptions } from 'ng-uikit-pro-standard';
import * as $ from 'jquery'; 
@Component({
  selector: 'page-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.scss']
})
export class PagePatientsComponent extends BasePageComponent implements OnInit, OnDestroy {
  patients: IPatient[];
  patientForm: FormGroup;
  gender: IOption[];
  status: IOption[];
  currentAvatar: string | ArrayBuffer;
  defaultAvatar: string;
  patientId:  any;
  recordId:any;
  hospitalId:any;
  dateMode:any;
  public API_URL:any = environment.backend;
  constructor(
    @Inject(DOCUMENT) private document: Document,
    store: Store<IAppState>,
    httpSv: HttpService,
    private fb: FormBuilder,
    private modal: TCModalService,
    private router : Router,
    private datePipe:DatePipe,
  ) {
    super(store, httpSv);

    this.pageData = {
      title: 'Patients',
      breadcrumbs: [
        {
          title: 'Medicine',
          route: 'default-dashboard'
        },
        {
          title: 'Patients'
        }
      ]
    };
    this.patients = [];
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
  }
  // public myDatePickerOptions: IMyOptions = {
  //   // Your options
  //   };

  // $(function () {
    
// });
onChange(result: Date): void { }

  onOk(result: Date): void { }

  handleDateOpenChange(open: boolean): void {
    if (open) {
      this.dateMode = 'date';
    }
  }

  handleDatePanelChange(mode: string): void { }
  ngOnInit() {
    super.ngOnInit();
    this.hospitalId = JSON.parse(localStorage.getItem('user')).id;
    this.getData(this.API_URL+'patients/'+this.hospitalId, 'patients', 'setLoaded');
    this.getData(this.API_URL+'doctors/'+this.hospitalId, 'doctors', 'setLoaded');
    // this.getData(this.API_URL+'patient-get', 'patients', 'setLoaded');
    this.httpSv.getpayment(this.API_URL+'patient-get/'+this.hospitalId).subscribe(response => {
      this.patients = response;
     });
  
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  // delete patient
  remove(id) {
    // this.store.dispatch(new PatientsActions.Delete(id));
    this.httpSv.updatePatient(this.API_URL+'patient-delete/',{_id:id._id}).subscribe(response => {
      this.document.location.reload();
    });
    
  }
  profile(id) {
    // this.store.dispatch(new PatientsActions.Delete(id));
    this.httpSv.updatePatient(this.API_URL+'patient-delete/',{_id:id._id}).subscribe(response => {
       this.getData(this.API_URL+"patients/"+this.hospitalId, 'patients', 'setPatients');
    });
    
  }
  redirectProfile(id){
    this.router.navigateByUrl('../patient-profile');
  }
  // openNew(id: string){
  //   this.router.navigate(['/component-one']);
  // }
  // open modal window
  openModal<T>(body: Content<T>, header: Content<T> = null, footer: Content<T> = null, row: IPatient) {
    this.initPatientForm(row);

    this.modal.open({
      body: body,
      header: header,
      footer: footer,
      options: null
    });
  }

  // close modal window
  closeModal() {
    this.modal.close();
    this.patientForm.reset();
    this.currentAvatar = this.defaultAvatar;
  }

  // upload new file
  onFileChanged(inputValue: any) {
    let file: File = inputValue.target.files[0];
    let reader: FileReader = new FileReader();

    reader.onloadend = () => {
      this.currentAvatar = reader.result;
    };

    reader.readAsDataURL(file);
  }

  // init form
  initPatientForm(data: IPatient) {
    this.currentAvatar = data.img ? data.img : this.defaultAvatar;
    this.patientId =data["id"];
    this.recordId = data["_id"]
    console.log(data);
    this.patientForm = this.fb.group({

      id:this.patients.length + 1,
      img: [this.currentAvatar],
      name: [data.name ? data.name : '', Validators.required],
      number: [data.number ? data.number : '', Validators.required],
      age: [data.age ? data.age : '', Validators.required],
      // lastVisit: [data.lastVisit ? data.lastVisit : '', Validators.required],
      gender: [data.gender ? data.gender.toLowerCase() : '', Validators.required],
      address: [data.address ? data.address : '', Validators.required],
      status: [data.status ? data.status.toLowerCase() : '', Validators.required]

    });
  }

  // update patient
  updatePatient(form: FormGroup) {
    if (form.valid) {
      
      form.value._id=this.recordId ;
      form.value.img = this.currentAvatar;
      
      let newPatient: IPatient = form.value;
      this.httpSv.updatePatient(this.API_URL+'patient-update',form.value).subscribe(response => {
        this.getData(this.API_URL+"patients/"+this.hospitalId, 'patients', 'setPatients');
      });
      console.log(newPatient);
      this.store.dispatch(new PatientsActions.Edit(newPatient));
      this.closeModal();
      this.patientForm.reset();
    }
  }
}
