import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AlertService } from './alert.service';

import { Alert } from './alert-Interface';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
})
export class NotificationComponent implements OnInit {
  //hide and show alert
  modalStatus!: boolean;

  //custom settings
  title!: string;
  type!: string;

  body!: string;

  //default settings
  titleColor!: string;
  bodyColor!: string;
  fontColor!: string;
  constructor(private alertService: AlertService) {}
  alertResponse: boolean = false;

  ngOnInit() {
    this.alertService.alertSettings$.subscribe((data: Alert) => {
      this.title = data.title;
      this.type = data.type;

      this.body = data.body;
      if (this.type == 'danger') {
        this.titleColor = '#FD6767';
        this.bodyColor = '#FDE8E8';
        this.fontColor = '#FD9392';
      }
      if (this.type == 'info') {
        this.titleColor = '#DCAE6A';
        this.bodyColor = '#FDF2E4';
        this.fontColor = '#D49D49';
      }
      if (this.type == 'success') {
        this.titleColor = '#47B895';
        this.bodyColor = '#E5F8F1';
        this.fontColor = '#43B792';
      }
      //show alert
      this.modalStatus = true;

      setTimeout(() => {
        this.modalStatus = false;
      }, 3000);
    });
  }
}
