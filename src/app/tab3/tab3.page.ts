import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  OnInit,
  AfterViewInit,
} from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { IonicModule } from '@ionic/angular';
import { IonicStorageService } from '../services/ionic-storage.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: true,
  imports: [IonicModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class Tab3Page implements OnInit, AfterViewInit {
  public current: any;
  constructor(
    private auth: Auth,
    private ionicStorageService: IonicStorageService
  ) {}

  ngOnInit() {
    this.getCurrentUser();

    // console.log(this.auth?.currentUser);
    // console.log(this.auth);
  }
  ngAfterViewInit(): void {
    // this.current = this.auth?.currentUser?.displayName;
    // console.log(this.auth, this.current);
  }

  async getCurrentUser() {
    try {
      const data = await this.ionicStorageService.getItem('user');
      this.current = JSON.parse(data);
      console.log(this.current);
    } catch (error) {
      console.error(error);
    }
  }

  onClick(action: string) {
    console.log(action);
  }

  onToggleColorTheme(event: any) {
    console.log(event.detail.checked);
    if (event.detail.checked) {
      document.body.setAttribute('color-theme', 'dark');
    } else document.body.setAttribute('color-theme', 'light');
  }
}
