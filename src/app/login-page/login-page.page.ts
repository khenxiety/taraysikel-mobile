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

  constructor(private router: Router, private toast: ToastService) {}

  ngOnInit() {}

  onClick(): void {
    if (this.loginForm.valid) {
      console.log(
        this.loginForm.controls['phoneNumber'].value,
        this.loginForm.controls['password'].value
      );
      this.router.navigate(['/tabs']);
      this.toast.presentToast('bottom', 'Login success');
    } else {
      this.toast.presentToast('bottom', 'Please fill up the fields');
    }
  }

  navigate(route: string): void {
    this.router.navigate([route]);
  }

  
}
