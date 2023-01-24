import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { AlertService } from './alert.service';
import { trigger, transition, style, animate } from '@angular/animations';
import { Alert } from './alert-Interface';

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.scss'],
  animations: [
    trigger('dialog', [
      transition('void => *', [
        style({ transform: 'scale3d(.3, .3, .3)' }),
        animate(100),
      ]),
      transition(
        'void => *',
        animate(100, style({ transform: 'scale3d(.3, .3, .3)' }))
      ),
    ]),
  ],
})
export class NotificationComponent implements OnInit {
  //hide and show alert
  modalStatus!: boolean;

  //custom settings
  title!: string;
  type!: string;
  time!: number;
  body!: string;

  //default settings
  backColor!: string;

  constructor(private alertService: AlertService) {}
  alertResponse: boolean = false;

  ngOnInit() {
    this.alertService.alertSettings$.subscribe((data: Alert) => {
      this.title = data.title;
      this.type = data.type;
      this.time = data.time;
      this.body = data.body;

      if (this.type == 'danger') {
        this.backColor = '#dc3545';
      }
      if (this.type == 'info') {
        this.backColor = '#a1930f';
      }
      if (this.type == 'success') {
        this.backColor = '#28a745';
      }
      //show alert
      this.modalStatus = true;

      setTimeout(() => {
        this.modalStatus = false;
      }, 2000);
    });
  }
}
