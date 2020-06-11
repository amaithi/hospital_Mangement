import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { Store } from '@ngrx/store';
import { EChartOption } from 'echarts';
import { BasePageComponent } from '../../base-page';
import { IAppState } from '../../../interfaces/app-state';
import { HttpService } from '../../../services/http/http.service';
import { IOption } from '../../../ui/interfaces/option';
import { IUser } from '../../../ui/interfaces/user';
const API_URL = 'http://localhost:5001/api/';
import { ActivatedRoute, Params } from '@angular/router';


@Component({
  selector: 'page-doctor-profile',
  templateUrl: './doctor-profile.component.html',
  styleUrls: ['./doctor-profile.component.scss']
})
export class PageDoctorProfileComponent extends BasePageComponent implements OnInit, OnDestroy {
  
  doctorInfo: IUser;
  doctorInfo1: IUser;
  doctorTimeline: any;
  doctorForm: FormGroup;
  gender: IOption[];
  currentAvatar: string | ArrayBuffer;
  defaultAvatar: string;
  specialists: string[];
  changes: boolean;
  currentId:  any;
  patientsOptions: EChartOption;
  constructor(
    store: Store<IAppState>,
    httpSv: HttpService,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {
    super(store, httpSv);

    this.pageData = {
      title: 'Doctor profile page',
      breadcrumbs: [
        {
          title: 'Medicine',
          route: 'default-dashboard'
        },
        {
          title: 'Doctors',
          route: 'doctors'
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
    this.defaultAvatar = 'assets/content/anonymous-400.jpg';
    this.currentAvatar = this.defaultAvatar;
    this.specialists = [];
    this.changes = false;
  }

  ngOnInit() {
    this.route.params.subscribe(res => {
      super.ngOnInit();
      console.log(this.doctorInfo1);
      // this.httpSv.getData(API_URL+'doctor-profile/'+res.id).subscribe(res1 => {
      //   console.log(res1);
      //   this.doctorInfo = res1;
      //   this.initDoctorForm(res1);

      //   this.httpSv.getData('assets/data/doctors-specialists.json').subscribe(res2 => {
      //     console.log(res2);
      //     this.httpSv.getData('assets/data/doctor-timeline.json').subscribe(res3 => {
            
      //     });
      //   });
      // });
     this.currentId = res.id;
     this.getData(API_URL+'doctor-profile/'+res.id, 'doctorInfo', 'loadedDetect')
      // this.getData('assets/data/doctors-specialists.json', 'specialists');
      // this.getData('assets/data/doctor-timeline.json', 'doctorTimeline');
      this.setPOptions();
    });
    
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  loadedDetect() {
    this.setLoaded();
    
    this.currentAvatar = this.doctorInfo.img;
    this.initDoctorForm(this.doctorInfo);
  }

  // init form
  initDoctorForm(data: IUser) {
    this.doctorForm = this.formBuilder.group({
      img: [this.currentAvatar],
      name: [data.name, Validators.required],
      lastName: [data.lastName],
      role: [data.role, Validators.required],
      address: [data.address, Validators.required],
      gender: [data.gender, Validators.required],
      social: new FormArray([])
    });

    data.social.forEach(soc => {
      (<FormArray>this.doctorForm.controls['social']).push(
        this.doctorSocial(soc.icon, soc.link)
      );
    });

    // detect form changes
    this.doctorForm.valueChanges.subscribe(() => {
      this.changes = true;
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

  // save form data
  saveData(form: FormGroup) {
    if (form.valid) {
      var saveReq = form.value;
      saveReq.id = this.currentId;
      saveReq.img = this.currentAvatar;
      this.httpSv.saveProf(API_URL+'doctor-update/',saveReq).subscribe(response => {
        console.log(response)
      });
    //  this.getData(API_URL+'doctor-update/'+saveReq, 'doctorInfo', 'loadedDetect')
      this.doctorInfo = form.value;
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

  // set patients chart options
  setPOptions() {
    this.patientsOptions = {
      color: ['#336cfb'],
      tooltip: {
        trigger: 'none',
        axisPointer: {
          type: 'cross'
        }
      },
      grid: {
        left: 30,
        right: 0,
        top: 50,
        bottom: 50
      },
      xAxis: [
        {
          type: 'category',
          axisTick: {
            alignWithLabel: true
          },
          axisLine: {
            onZero: false,
            lineStyle: {
              color: '#336cfb'
            }
          },
          axisPointer: {
            label: {
              formatter: function (params) {
                return 'Patients ' + params.value
                  + (params.seriesData.length ? '：' + params.seriesData[0].data : '');
              }
            }
          },
          data: ['2018-1', '2018-2', '2018-3', '2018-4', '2018-5', '2018-6', '2018-7', '2018-8', '2018-9', '2018-10', '2018-11', '2018-12']
        }
      ],
      yAxis: [
        {
          type: 'value'
        }
      ],
      series: [
        {
          name: 'Patients 2018',
          type: 'line',
          smooth: true,
          data: [95, 124, 132, 143, 138, 178, 194, 211, 234, 257, 241, 226]
        }
      ]
    };
  }
}
