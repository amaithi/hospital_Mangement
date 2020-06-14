import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { BasePageComponent } from '../../base-page';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { IAppState } from '../../../interfaces/app-state';
import { HttpService } from '../../../services/http/http.service';
import { TCModalService } from '../../../ui/services/modal/modal.service';
import { IUser } from '../../../ui/interfaces/user';
const API_URL = 'http://localhost:5001/api/';
import { IgxDatePickerComponent } from 'igniteui-angular';
@Component({
  selector: 'page-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss']
})
export class PageAppointmentsComponent extends BasePageComponent implements OnInit, OnDestroy {
  @ViewChild('modalBody', { static: true }) modalBody: ElementRef<any>;
  @ViewChild('modalFooter', { static: true }) modalFooter: ElementRef<any>;
  @ViewChild('datePicker') datePicker: IgxDatePickerComponent;

  public date: Date = new Date(Date.now());
  appointments: any[];
  appointmentForm: FormGroup;
  currentAvatar: string | ArrayBuffer;
  defaultAvatar: string;
  doctors: IUser[];
  dateRange: Date[];
  size: string;
  dateMode: string;

  constructor(
    store: Store<IAppState>,
    httpSv: HttpService,
    private modal: TCModalService,
    private formBuilder: FormBuilder
  ) {
    super(store, httpSv);

    this.pageData = {
      title: 'Appointments',
      breadcrumbs: [
        {
          title: 'Medicine',
          route: 'default-dashboard'
        },
        {
          title: 'Appointments'
        }
      ]
    };
    this.date = new Date();
    this.dateRange = [];
    this.size = 'default';
    this.dateMode = 'date';
    this.appointments = [];
    this.doctors = [];
    this.defaultAvatar = 'assets/content/anonymous-400.jpg';
    this.currentAvatar = this.defaultAvatar;
  }

  ngOnInit() {
    super.ngOnInit();

    this.getData(API_URL+"listAppointment", 'appointments', 'setLoaded');
    this.getData(API_URL+"doctors", 'doctors', 'setLoaded');
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }

  // open modal window
  openModal(body: any, header: any = null, footer: any = null, data: any = null) {
    this.initForm(data);

    this.modal.open({
      body: body,
      header: header,
      footer: footer
    });
  }

  // close modal window
  closeModal() {
    this.modal.close();
    this.appointmentForm.reset();
  }

  // init form
  initForm(data: any) {
    this.appointmentForm = this.formBuilder.group({
      
      img: [(data ? data.img : this.currentAvatar)],
      name: [(data ? data.name : ''), Validators.required],
      email: [(data ? data.email : ''), Validators.required],
      date: [(data ? data.date : new Date()), Validators.required],
      from: [(data ? data.fromTo.substring(0, (data.fromTo.indexOf('-') - 1)) : ''), Validators.required],
      to: [(data ? data.fromTo.substring((data.fromTo.indexOf('-') + 2), data.fromTo.length) : ''), Validators.required],
      number: [(data ? data.number : ''), Validators.required],
      doctor: [(data ? data.doctor : ''), Validators.required],
      injury: [(data ? data.injury : ''), Validators.required],
      id:[(data ? data._id : '')]
    });
    
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
  onChange(result: Date): void { }

  onOk(result: Date): void { }

  handleDateOpenChange(open: boolean): void {
    if (open) {
      this.dateMode = 'date';
    }
  }

  // handleDatePanelChange(mode: string): void { }
  // edit appointment
  edit(row: any) {
    this.openModal(this.modalBody, 'Add appointment', this.modalFooter, row);
  }

  // remove appointment
  remove(tableRow: any) {
    this.appointments = this.appointments.filter(row => row !== tableRow);
    this.httpSv.deleteAppointment(API_URL+'appointment-delete/',{_id:tableRow._id}).subscribe(response => {
      console.log(response)
    });

  }


  handleDatePanelChange(mode: string): void { }

  // add new appointment
  addAppointment(form: FormGroup) {
    if (form.valid) {
      form.value.img = this.currentAvatar;
      this.httpSv.addDoctorProf(API_URL+'appointment-update/',form.value).subscribe(response => {
        console.log(response)
      });
      let newAppointment: any = form.value;

      newAppointment.fromTo = `${form.value.from} - ${form.value.to}`;
      newAppointment.img = this.currentAvatar;

      delete newAppointment.from;
      delete newAppointment.to;

      this.appointments.unshift(newAppointment);
      let newTableData = JSON.parse(JSON.stringify(this.appointments));

      this.appointments = newTableData;
      this.closeModal();
    }
  }
}