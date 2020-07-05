import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { Store } from '@ngrx/store';
import { BasePageComponent } from '../../base-page';
import { IUser } from '../../../ui/interfaces/user';
import { IAppState } from '../../../interfaces/app-state';
import { HttpService } from '../../../services/http/http.service';
import { Content } from '../../../ui/interfaces/modal';
import { TCModalService } from '../../../ui/services/modal/modal.service';
import { IOption } from '../../../ui/interfaces/option';
import { environment } from '../../../env';
@Component({
  selector: 'page-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['./doctors.component.scss']
})
export class PageDoctorsComponent extends BasePageComponent implements OnInit, OnDestroy {
  doctors: IUser[];
  doctorForm: FormGroup;
  gender: IOption[];
  currentAvatar: string | ArrayBuffer;
  defaultAvatar: string;
  specialists: string[];
   filedata = new FormData();
   doctorlength:any;
   hospitalId:any;
   public API_URL:any = environment.backend;
  newImage:any;
  constructor(
    store: Store<IAppState>,
    httpSv: HttpService,
    private modal: TCModalService,
    private formBuilder: FormBuilder
  ) {
    super(store, httpSv);

    this.pageData = {
      title: 'Doctors',
      breadcrumbs: [
        {
          title: 'Medicine',
          route: 'default-dashboard'
        },
        {
          title: 'Doctors'
        }
      ]
    };
    this.doctors = [];
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
    this.specialists = [];
  }

  ngOnInit() {
    this.hospitalId =JSON.parse(localStorage.getItem('user')).id;
    super.ngOnInit();

    this.getData(this.API_URL+"doctors/"+this.hospitalId, 'doctors', 'setLoaded');

    this.httpSv.getData(this.API_URL+'account-get/'+this.hospitalId).subscribe(response => {
      this.specialists = response[0].specialists;
    });
    // this.getData('assets/data/doctors-specialists.json', 'specialists');
    this.getdoctors();
  }
  getdoctors(){
    this.httpSv.getdoctors(this.API_URL+'doctors/'+this.hospitalId).subscribe(response => {
      if(response.length !=0){ 
        this.doctorlength =  Number(response[response.length-1].doctorId)
      }else{
        this.doctorlength = 0;
      }
      });
  }
  ngOnDestroy() {
    super.ngOnDestroy();
  }

  // open modal window
  openModal<T>(body: Content<T>, header: Content<T> = null, footer: Content<T> = null, options: any = null) {
    this.initDoctorForm();

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
    this.doctorForm.reset();
    this.currentAvatar = this.defaultAvatar;
  }

  // upload new file
  onFileChanged(inputValue: any) {
    let file: File = inputValue.target.files[0];
    let reader: FileReader = new FileReader();

    reader.onloadend = () => {
      this.currentAvatar = reader.result;
    };
    this.newImage =  this.filedata;
    reader.readAsDataURL(file);
    
  }
  
  // add new doctor
  addDoctor(form: FormGroup) {
    if (form.valid) {
      var addreq = form.value;
      addreq.imagefile =  this.newImage;
      addreq.profileLink =  "doctor-profile";
      addreq.img =  this.currentAvatar;
      addreq.name = form.value.name;
      addreq.lastName = form.value.lastName;
      addreq.doctorId = this.doctorlength +1;
      addreq.label = form.value.name +' | '+ this.doctorlength +1;
      addreq.hospitalId = JSON.parse(localStorage.getItem('user')).id;
      
      this.httpSv.addDoctorProf(this.API_URL+'doctor-add/',addreq).subscribe(response => {
      // delete form.value.gender;
      this.getdoctors();
      addreq._id = response._id;
      let newDoctor: IUser = addreq;
      newDoctor.img = this.currentAvatar;
      newDoctor.name = `${newDoctor.name}`;
      newDoctor.profileLink = 'doctor-profile';
      this.doctors.unshift(newDoctor);
      this.closeModal();
      });
      
    }
  }

  // init form
  initDoctorForm() {
    this.doctorForm = this.formBuilder.group({
      img: [],
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      role: ['', Validators.required],
      address: ['', Validators.required],
      gender: ['', Validators.required],
      social: new FormArray([
        this.doctorSocial('icofont-instagram', '#'),
        this.doctorSocial('icofont-facebook', '#'),
        this.doctorSocial('icofont-twitter', '#')
      ])
    });
  }

  // init doctor social
  doctorSocial(icon: string, link: string) {
    return new FormGroup({
      icon: new FormControl(icon, Validators.required),
      link: new FormControl(link, Validators.required)
    });
  }

  // add social control
  addControl(controls: any, iconInput: any, linkInput: any) {
    if (iconInput.value && linkInput.value) {
      controls.push(
        this.doctorSocial(iconInput.value, linkInput.value)
      );
      iconInput.value = '';
      linkInput.value = '';
    }
  }

  // remove social control
  removeControl(controls: any, index: number) {
    controls.removeAt(index);
  }
}
