 import { Component ,Input,ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-server-elemnt',
  templateUrl: './server-elemnt.component.html',
  styleUrls: ['./server-elemnt.component.scss'],
  encapsulation:ViewEncapsulation.None
})
export class ServerElemntComponent {
  constructor(){ }

  @Input('srvElement')
  element!: { type: string; name: string; content: string; };

}
