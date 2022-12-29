import { Component } from '@angular/core';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.scss'],
})
export class ServersComponent {
  serverCreationStatus = 'No server Was Created';
  allowServer: boolean = false;
  serverName:string='TestServer' ;
  serverCreated:boolean=false;
  serverStatus:string='offLine'
  servers=['TestServer','TestServer2']
  constructor() {

  }

  createServer() {
    this.serverCreated=true
    this.serverCreationStatus = 'server is created '+this.serverName;
    this.servers.push(this.serverName);
  }

}
