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

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.page.html',
  styleUrls: ['./login-page.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule],
})
export class LoginPagePage implements OnInit {
  public loginForm: FormGroup = new FormGroup({
    phoneNumber: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(private router: Router, private toast: ToastController) {}

  ngOnInit() {}

  onClick(): void {
    if (this.loginForm.valid) {
      console.log(
        this.loginForm.controls['phoneNumber'].value,
        this.loginForm.controls['password'].value
      );
      this.router.navigate(['/tabs']);
      this.presentToast('bottom', 'Login success');
    } else {
      this.presentToast('bottom', 'Please fill up the fields');
    }
  }

  navigate(route: string): void {
    this.router.navigate([route]);
  }

  async presentToast(position: 'top' | 'middle' | 'bottom', message: string) {
    const toast = await this.toast.create({
      message: message,
      duration: 1500,
      position: position,
    });

    await toast.present();
  }
}
