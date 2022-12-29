import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  Username = '';
  serverElements=[{type:'server',name:'TestServer',content:'Just a test'}]


  ServerAdded(serverData:{serverName:string,serverContent:string}){
    this.serverElements.push({
    type:'server',
    name:serverData.serverName,
    content:serverData.serverContent

    })

      }

       ServerBlueprintAdded(blueprintData:{serverName:string,serverContent:string}){
        this.serverElements.push({
          type:'blueprint',
          name:blueprintData.serverName,
          content:blueprintData.serverContent

          })


      }






}
