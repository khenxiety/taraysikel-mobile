import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule,
  FormControl,
  Validators,
  FormGroup,
} from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.page.html',
  styleUrls: ['./signup-page.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, ReactiveFormsModule],
})
export class SignupPagePage implements OnInit {
  public loginForm: FormGroup = new FormGroup({
    phoneNumber: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
  });
  constructor(
    private router: Router,
    private location: Location,
    private toast: ToastController
  ) {}

  ngOnInit() {}

  onClick(): void {
    if (this.loginForm.valid) {
      console.log(
        this.loginForm.controls['phoneNumber'].value,
        this.loginForm.controls['password'].value
      );
      this.router.navigate(['/tabs']);
      this.presentToast('bottom', 'Registration successful');
    } else {
      this.presentToast('bottom', 'Please fill up the fields');
    }
  }
  navigate(route: string) {
    // this.router.navigate([route]);

    this.location.back();
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
