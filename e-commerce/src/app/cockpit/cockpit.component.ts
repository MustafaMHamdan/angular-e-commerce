import { Component,ViewChild ,EventEmitter,Output,ElementRef} from '@angular/core';

@Component({
  selector: 'app-cockpit',
  templateUrl: './cockpit.component.html',
  styleUrls: ['./cockpit.component.scss']
})
export class CockpitComponent {
  @Output()    serverCreated=new EventEmitter<{serverName:string,serverContent:string}>();
  @Output() blueprintCreated =new EventEmitter<{serverName:string,serverContent:string}>();
  /* newServerName=''
  newServerContent='' */
  @ViewChild('serverContentInput', {static: true}) serverContentInput!: ElementRef

  AddServer(nameInput:any){
    console.log(this.serverContentInput);

this.serverCreated.emit({
  serverName:nameInput.value,
  serverContent:this.serverContentInput.nativeElement.value})

  }

  AddServerBlueprint(nameInput:any){
    this.blueprintCreated.emit({
      serverName:nameInput.value,
      serverContent:this.serverContentInput.nativeElement.value})

  }

}
