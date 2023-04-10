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
import { LoaderService } from 'src/app/services/loader/loader.service';

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

  public progressValue: number = 0;
  public textClass: string = '';
  public progressText: string = '';
  public progressHintText: string = '';

  constructor(
    private router: Router,
    private location: Location,
    private toast: ToastController,
    private loadingService: LoaderService
  ) {}

  ngOnInit() {
    this.formInitialise();
  }

  onClick(): void {
    this.loadingService.show('Registering...');
    const { phoneNumber, password } = this.loginForm.controls;
    if (!this.loginForm.valid) {
      this.presentToast('bottom', 'Please fill up the fields');
      setTimeout(() => {
        this.loadingService.hide();
      }, 300);

      return;
    }
    if (this.progressValue < 0.66) {
      const message =
        this.progressText.toLowerCase() === 'very weak'
          ? this.progressText.toLowerCase()
          : `too ${this.progressText.toLowerCase()}`;
      setTimeout(() => {
        this.loadingService.hide();
      }, 300);
      this.presentToast('bottom', `Password is ${message}`);
      return;
    }
    console.log(phoneNumber.value, password.value);
    this.loadingService.hide();
    this.router.navigate(['/tabs']);
    this.presentToast('bottom', 'Registration successful');
  }

  navigate(route: string) {
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

  formInitialise() {
    const password = this.loginForm?.get('password');
    const validationRules = [
      { regex: /[\W_]/, hint: '(Add special characters)' },
      { regex: /[A-Z]/, hint: '(Add an uppercase letter)' },
      { regex: /^.{8,}$/, hint: '(Password should be 8 or more characters)' },
    ];

    password?.valueChanges.subscribe((value: string) => {
      let progressValue = 0;
      let progressText = '';
      let progressHintText = '';
      let textClass = 'danger';

      validationRules.forEach((rule) => {
        if (!rule.regex.test(value)) {
          progressHintText = rule.hint;
        } else {
          progressValue += 1 / validationRules.length;
        }
      });

      const progressTextMap: any = {
        0: { class: 'danger', text: 'Very Weak' },
        0.33: { class: 'danger', text: 'Weak' },
        0.67: { class: 'primary', text: 'Good' },
        1: { class: 'success', text: 'Strong' },
      };

      const progressValueKeys = Object.keys(progressTextMap)
        .map(parseFloat)
        .sort()
        .reverse();
      for (const key of progressValueKeys) {
        if (progressValue >= key) {
          textClass = progressTextMap[key].class;
          progressText = progressTextMap[key].text;

          break;
        }
      }

      this.progressValue = progressValue;
      this.progressHintText = progressHintText;
      this.progressText = progressText;
      this.textClass = textClass;
    });
  }
}
