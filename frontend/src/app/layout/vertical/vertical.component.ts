import { Component, ElementRef, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';

import { IAppState } from '../../interfaces/app-state';
import { BaseLayoutComponent } from '../base-layout/base-layout.component';
import { HttpService } from '../../services/http/http.service';
import { IOption } from '../../ui/interfaces/option';
import { Content } from '../../ui/interfaces/modal';
import { TCModalService } from '../../ui/services/modal/modal.service';
import { IPatient } from '../../interfaces/patient';
import * as PatientsActions from '../../store/actions/patients.actions';
import * as SettingsActions from '../../store/actions/app-settings.actions';

import { DatePipe } from '@angular/common';
import { AnyARecord } from 'dns';
import { environment } from '../../../../src/app/env';

@Component({
  selector: 'vertical-layout',
  templateUrl: './vertical.component.html',
  styleUrls: [
    '../base-layout/base-layout.component.scss',
    './vertical.component.scss'
  ]
})
export class VerticalLayoutComponent extends BaseLayoutComponent implements OnInit {
  patientForm: FormGroup;
  gender: IOption[];
  currentAvatar: string | ArrayBuffer;
  defaultAvatar: string;
  patientcount: any;
  doctorlength:any;
  hospitalId: any;
  public API_URL:any = environment.backend;
  constructor(
    store: Store<IAppState>,
    fb: FormBuilder,
    httpSv: HttpService,
    router: Router,
    elRef: ElementRef,
    private modal: TCModalService,
    private datePipe :DatePipe
  ) {
    super(store, fb, httpSv, router, elRef);

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
    this.defaultAvatar = 'assets/content/anonymous-400.jpg';
    this.currentAvatar = this.defaultAvatar;
  }

  ngOnInit() {
    super.ngOnInit();
    this.getdoctors();
    this.hospitalId =JSON.parse(localStorage.getItem('user')).id;
    this.httpSv.getPatient(this.API_URL+'patient-get/'+this.hospitalId).subscribe(response => {
      if(response.length != 0){
        this.patientcount = Number(response[response.length-1].id)+1;
      }else{
        this.patientcount =1;
      }
    });
    this.store.dispatch(new SettingsActions.Update({ layout: 'vertical' }));
  }
  getdoctors(){
    // this.httpSv.getdoctors(this.API_URL+'doctor-add/').subscribe(response => {
    //   this.doctorlength = response.length
    //   });
  }
  // open modal window
  openModal<T>(body: Content<T>, header: Content<T> = null, footer: Content<T> = null, options: any = null) {
    this.initPatientForm();

    this.modal.open({
      body: body,
      header: header,
      footer: footer,
      options: options
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
  initPatientForm() {
    this.patientForm = this.fb.group({
      img: [],
      name: ['', Validators.required],
      number: ['', Validators.required],
      age: ['', Validators.required],
      gender: ['', Validators.required],
      address: ['', Validators.required]
    });
  }

  // add new patient
  addPatient(form: FormGroup) {
    if (form.valid) {
      let newPatient: IPatient = form.value;
      // patient-add
      newPatient.img = this.currentAvatar;
      newPatient.id = this.patientcount;
      newPatient.status = 'Pending';
      newPatient.label = String(this.patientcount) +' | '+newPatient.name;
      newPatient.lastVisit = this.datePipe.transform(new Date(), 'dd-MM-yyyy');
      newPatient.hospitalId = JSON.parse(localStorage.getItem('user')).id;
      this.httpSv.addPatient(this.API_URL+'patient-add/',newPatient).subscribe(response => {
        this.httpSv.getPatient(this.API_URL+'patient-get/'+this.hospitalId).subscribe(response => {
          this.patientcount = Number(response[response.length-1].id)+1;
        });
      });
      this.store.dispatch(new PatientsActions.Add(newPatient));
      this.closeModal();
      this.patientForm.reset();
    }
  }
}
