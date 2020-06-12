import { Component, ViewChild } from "@angular/core";
import { IgxDatePickerComponent } from 'igniteui-angular';

@Component({
  selector: "app-datepicker-sample-6",
  styleUrls: ["./datepicker-sample-6.component.scss"],
  templateUrl: "./datepicker-sample-6.component.html"
})
export class DatepickerSample6Component {
  @ViewChild('datePicker') datePicker: IgxDatePickerComponent;

  public date: Date = new Date(Date.now());

  constructor() { }


}
