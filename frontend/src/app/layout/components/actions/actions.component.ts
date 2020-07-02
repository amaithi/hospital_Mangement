import { Component, EventEmitter, Input, OnInit } from '@angular/core';

import {ActivatedRoute, Router} from "@angular/router";
import { HttpService } from '../../../services/http/http.service';
import { Location } from '@angular/common';
@Component({
  selector: 'actions',
  templateUrl: './actions.component.html',
  styleUrls: ['./actions.component.scss']
})
export class ActionsComponent implements OnInit {
  notifications: any[];
  messages: any[];
  files: any[];
  closeDropdown: EventEmitter<boolean>;
  @Input() layout: string;
  profileName:any;

  constructor(
    private httpSv: HttpService,
    private router: Router,
    private location: Location
  ) {
    this.notifications = [];
    this.messages = [];
    this.files = [];
    this.closeDropdown = new EventEmitter<boolean>();
    this.layout = 'vertical';
  }

  ngOnInit() {
    var data = localStorage.getItem('user');
    if(data ==null){
      this.router.navigateByUrl('/public/sign-in');
    }
    var parseData = JSON.parse(data);
    this.profileName =parseData.name;
    this.getData('assets/data/navbar-notifications.json', 'notifications');
    this.getData('assets/data/navbar-messages.json', 'messages');
    this.getData('assets/data/navbar-files.json', 'files');
  }

  getData(url: string, dataName: string) {
    this.httpSv.getData(url).subscribe(
      data => {
        this[dataName] = data;
      },
      err => {
        console.log(err);
      }
    );
  }
  logout(){
    localStorage.removeItem('user');
    this.location.back();
  }
  onCloseDropdown() {
    this.closeDropdown.emit(true);
  }

  goTo(event: Event, link: string, layout: string = '') {
    event.preventDefault();

    this.onCloseDropdown();
   // localStorage.removeItem('user');
    setTimeout(() => {
      if(layout){
        localStorage.removeItem('user')
      }
      this.router.navigate([layout ? layout  : this.layout, link]);
    });
  }
}
