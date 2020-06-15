import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Store } from '@ngrx/store';
import { BasePageComponent } from '../../base-page';
import { IAppState } from '../../../interfaces/app-state';
import { HttpService } from '../../../services/http/http.service';
import { IOption } from '../../../ui/interfaces/option';
const API_URL = 'http://localhost:5001/api/';

@Component({
  selector: 'page-patient-profile',
  templateUrl: './patient-profile.component.html',
  styleUrls: ['./patient-profile.component.scss']
})
export class PagePatientProfileComponent extends BasePageComponent implements OnInit, OnDestroy {
  patientInfo: any;
  patientTimeline: any;
  patientForm: FormGroup;
  gender: IOption[];
  status: IOption[];
  currentAvatar: string | ArrayBuffer;
  defaultAvatar: string;
  changes: boolean;
  billings: any[];
  patientDataid :any;
  constructor(
    store: Store<IAppState>,
    httpSv: HttpService,
    private formBuilder: FormBuilder
  ) {
    super(store, httpSv);

    this.pageData = {
      title: 'Patient profile page',
      breadcrumbs: [
        {
          title: 'Medicine',
          route: 'default-dashboard'
        },
        {
          title: 'Patients',
          route: 'patients'
        },
        {
          title: 'Dr. Sophie'
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
    this.billings = [];
  }

  ngOnInit() {
    super.ngOnInit();
    this.httpSv.getPatient(API_URL+'patient-get/').subscribe(response => {
      
    });
    this.getData('assets/data/patient-info.json', 'patientInfo', 'loadedDetect');
    this.getData('assets/data/patient-timeline.json', 'patientTimeline');
    this.getData('assets/data/patient-billings.json', 'billings');
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  loadedDetect() {
    this.setLoaded();

    this.currentAvatar = this.patientInfo.img;
    this.initPatientForm(this.patientInfo);
  }

  // init form
  initPatientForm(data: any) {
    console.log(data.status)
    this.patientDataid = data._id;
    this.patientForm = this.formBuilder.group({
      img: [this.currentAvatar],
      name: [data.name, Validators.required],
      number: [data.number, Validators.required],
      address: [data.address, Validators.required],
      gender: [data.gender, Validators.required],
      age: [data.age, Validators.required],
      id: [data.id, Validators.required],
      lastVisit: [data.lastVisit, Validators.required],
      status: [data.status, Validators.required]
    });

    // detect form changes
    this.patientForm.valueChanges.subscribe(() => {
      this.changes = true;
    });
  }

  // save form data
  saveData(form: FormGroup) {
    if (form.valid) {
      this.patientInfo = form.value;
      this.changes = false;
      this.httpSv.profileupdate(API_URL+'patient-update/',form.value).subscribe(response => {
        console.log(response);
      });
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
