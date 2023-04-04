import { CUSTOM_ELEMENTS_SCHEMA, Component } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: true,
  imports: [IonicModule],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA]
})
export class Tab3Page {
  constructor() {}


  onClick(action:string){
    console.log(action)
  }
}
