import { Component } from '@angular/core';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.scss']
})
export class ServerComponent {

serverStatus:string="online"
serverId:number=10

constructor() {
  this.serverStatus=Math.random()>0.5 ? 'onLine':'offLine'
    }
getColor(){

  return this.serverStatus ==='onLine' ?'green':'red'

}
}
