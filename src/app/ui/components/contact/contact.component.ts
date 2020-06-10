import { Component, OnInit, HostBinding, Input } from '@angular/core';
import { IUser } from '../../interfaces/user';

@Component({
  selector: 'tc-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class TCContactComponent implements OnInit {
  
	@HostBinding('class.tc-contact') true;

	@Input() data: IUser;
  userid: any;
  constructor() {}

  ngOnInit() {
    this.userid = '../'+this.data.profileLink+'/'+this.data._id
    console.log(this.data)
  }
}
