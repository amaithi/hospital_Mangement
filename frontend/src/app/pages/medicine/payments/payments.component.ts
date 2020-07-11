import { Component, OnDestroy, OnInit,ChangeDetectionStrategy } from '@angular/core';
import { BasePageComponent } from '../../base-page';
import { Store } from '@ngrx/store';
import { IAppState } from '../../../interfaces/app-state';
import { HttpService } from '../../../services/http/http.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Content } from '../../../ui/interfaces/modal';
import { TCModalService } from '../../../ui/services/modal/modal.service';
import { IUser } from '../../../ui/interfaces/user';
import { environment } from '../../../env';
import { DatePipe } from '@angular/common';
// import { IMyOptions } from 'ng-uikit-pro-standard';
import * as $ from 'jquery'; 
@Component({
  selector: 'page-payments',
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.scss']
})
export class PagePaymentsComponent extends BasePageComponent implements OnInit, OnDestroy {
  payments: any[];
  paymentForm: FormGroup;
  doctors: IUser[];
  date: Date;
  dateRange: Date[];
  size: string;
  dateMode: string;
  totaldata:  any;
  patients: any;
  public API_URL:any = environment.backend;
  hospitalId:any;
  constructor(
    store: Store<IAppState>,
    httpSv: HttpService,
    private modal: TCModalService,
    private formBuilder: FormBuilder,
    private datePipe: DatePipe
  ) {
    super(store, httpSv);

    this.pageData = {
      title: 'Payments',
      breadcrumbs: [
        {
          title: 'Medicine',
          route: 'default-dashboard'
        },
        {
          title: 'Payments'
        }
      ]
    };
    this.payments = [];
    this.doctors = [];
    this.date = new Date();
    this.dateRange = [];
    this.size = 'default';
    this.dateMode = 'date';
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
    this.getData(this.API_URL+'payments-get/'+this.hospitalId, 'payments', 'setLoaded');
    this.getData(this.API_URL+'doctors/'+this.hospitalId, 'doctors', 'setLoaded');
    // this.getData(this.API_URL+'patient-get', 'patients', 'setLoaded');
    this.httpSv.getpayment(this.API_URL+'patient-get/'+this.hospitalId).subscribe(response => {
      this.patients = response;
     });
  
  }

  ngOnDestroy() {
    super.ngOnDestroy();
  }
  calculation(){
    console.log('yest');
    var taxcal =(this.paymentForm.value.charges * this.paymentForm.value.tax)/100;
    var discount = (this.paymentForm.value.charges * this.paymentForm.value.discount)/100;
    // this.paymentForm.value.total = Math.round(Number(this.paymentForm.value.charges) + taxcal - discount);
    this.paymentForm.get('total').patchValue(Math.round(Number(this.paymentForm.value.charges) + taxcal - discount))
  }
  // open modal window
  openModal<T>(body: Content<T>, header: Content<T> = null, footer: Content<T> = null, options: any = null) {
    this.initPaymentForm();

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
    this.paymentForm.reset();
  }

  // init form
  initPaymentForm() {
    this.httpSv.getpayment(this.API_URL+'payments-get/'+this.hospitalId).subscribe(response => {
      if(response.length !=0){
        this.paymentForm = this.formBuilder.group({
          billNo: [response.length+1],
          billDate: ['', Validators.required],
          patient: ['', Validators.required],
          doctor: ['', Validators.required],
          charges: ['', Validators.required],
          tax: [5, Validators.required],
          discount: [10, Validators.required],
          total: ['', Validators.required],
          // date: ['', Validators.required]
        });
      //  setTimeout (() => {
      //    this.totaldata = response.length;
      //    this.paymentForm.get('billNo').patchValue(response.length+1) 
      // }, 200);
     
      }else{
        this.paymentForm = this.formBuilder.group({
          billNo: [1],
          billDate: ['', Validators.required],
          patient: ['', Validators.required],
          doctor: ['', Validators.required],
          charges: ['', Validators.required],
          tax: [5, Validators.required],
          discount: [10, Validators.required],
          total: ['', Validators.required],
          // date: ['', Validators.required]
        });
       
      }
   
     });
   
  }

  // add new payment
  addPayment(form: FormGroup) {
    if (form.valid) {
      // form.value.billNo = this.totaldata + 1;
      form.value.billDate = this.datePipe.transform(form.value.billDate, 'yyyy-MM-dd');
      var req = form.value;
      
      req.patientId =  form.value.patient._id;
      req.patient =  form.value.patient.name;
      req.doctorId = form.value.doctor._id;
      req.doctor = form.value.doctor.name;
      req.hospitalId = JSON.parse(localStorage.getItem('user')).id;
      this.httpSv.addPayment(this.API_URL+'payments-add/',req).subscribe(response => {
        if(response.status == 200){
          // this.httpSv.sendpaymentsms(this.API_URL+'payment-sms/',req).subscribe(res => {
          //   console.log(res)
          // });
        }
        this.payments.unshift(form.value);
        let newTableData = JSON.parse(JSON.stringify(this.payments));
  
        this.payments = newTableData;
        this.closeModal();
      });
     
    }
  }
}
