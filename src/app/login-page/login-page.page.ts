import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ToastService } from '../services/toast/toast.service';
import { RegistrationService } from '../services/registration/registration.service';
import { LoaderService } from '../services/loader/loader.service';
import { IonicStorageService } from '../services/ionic-storage.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.page.html',
  styleUrls: ['./login-page.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule],
})
export class LoginPagePage implements OnInit {
  public loginForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(
    private router: Router,
    private toast: ToastService,
    private registrationService: RegistrationService,
    private loaderService: LoaderService,
    private ionicStorageService: IonicStorageService
  ) {}

  ngOnInit() {}

  async onClick() {
    if (!this.loginForm.valid) {
      this.toast.presentToast('bottom', 'Please fill up all the fields');

      return;
    }
    try {
      this.loaderService.show();
      const login = await this.registrationService.userLogin(this.loginForm);
      if (login.status === 200) {
        this.ionicStorageService.setItem(JSON.stringify(login.data), 'user');
        this.loginForm.reset();
        this.router.navigate(['/tabs']);
        this.toast.presentToast('bottom', 'Login success');
        console.log(login);
      }
    } catch (error) {
      this.toast.presentToast('bottom', 'Login failed');
    } finally {
      this.loaderService.hide();
    }
  }

  navigate(route: string): void {
    this.router.navigate([route]);
  }
}
