import {
  CUSTOM_ELEMENTS_SCHEMA,
  Component,
  OnInit,
  AfterViewInit,
} from '@angular/core';
import { Auth } from '@angular/fire/auth';
import { IonicModule } from '@ionic/angular';
import { IonicStorageService } from '../services/ionic-storage.service';
import { RegistrationService } from '../services/registration/registration.service';
import { ToastService } from '../services/toast/toast.service';
import { Router } from '@angular/router';

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
    private authService:RegistrationService,
    private ionicStorageService: IonicStorageService,
    private toast:ToastService,
    private router:Router
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


  async logout(){

    try {
      const logout = await this.authService.userLogout()
      console.log(logout)
      this.router.navigate(['/'])

      this.toast.presentToast('bottom','User logout successfully')
    } catch (error) { 
      throw error
    }

  }
}
