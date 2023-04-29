import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import {
  IonicModule,
  LoadingController,
  ToastController,
} from '@ionic/angular';
import { SliderPage } from '../components/slider/slider.page';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { GeolocationService } from '../services/geolocation.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { DecimalPipe } from '@angular/common';
import { Helper } from '../helpers/helper';

import { LoaderService } from '../services/loader/loader.service';
import { ToastService } from '../services/toast/toast.service';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, SliderPage, ReactiveFormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [GeolocationService, Geolocation],
})
export class Tab1Page {
  private decimalPipe = new DecimalPipe('en-US');

  public buttons: any[] = [
    {
      title: 'Solo',
      logo: 'person-sharp',
      route: '/solo-booking-page',
      // action: this.test,
    },
    {
      title: 'Share',
      logo: 'people-sharp',
      route: '/',
      // action: this.test.bind(this),
    },
    {
      title: 'Bookings',
      logo: 'pricetag-sharp',
      route: '/booking-list',
      // action: this.test.bind(this),
    },
    {
      title: 'Reminders',
      logo: 'notifications-sharp',
      route: '/',
      // action: this.test.bind(this),
    },
    {
      title: 'History',
      logo: 'time-sharp',
      route: '/',
      // action: this.test.bind(this),
    },
  ];

  public popularDestinations: any[] = [
    {
      id: 1,
      img: 'assets/basilica.jpg',
      title: 'Basilica',
      route: '/booking-page',
      query: 'Taal Basilica',
    },
    {
      id: 2,
      img: 'assets/galleria.jpg',
      title: 'Galleria',
      route: '/booking-page',
      query: 'Taal Galleria',
    },
    {
      id: 3,
      img: 'assets/museo.jpg',
      title: 'Museo Apacible',
      route: '/booking-page',
      query: 'Museo Apacible',
    },
    {
      id: 4,
      img: 'assets/marcella.jpg',
      title: 'Marcela Agoncillo Museum',
      route: '/booking-page',
      query: 'Marcela Agoncillo Museum',
    },
    {
      id: 5,
      img: 'assets/casa.jpg',
      title: 'Casa Real',
      route: '/booking-page',
      query: 'Casa Real',
    },
  ];

  public exploreDestinations:any[]=[
    {
      id: 6,
      img: 'assets/destination-sample.png',
      title: 'Paradores Del Castillo',
      route: '/booking-page',
      query: 'Paradores Del Castillo',
    },
    {
      id: 7,
      img: 'assets/butong.jpg',
      title: 'Butong Seaside',
      route: '/booking-page',
      query: 'Butong Seaside',
    },
    {
      id: 8,
      img: 'assets/farmville.jpg',
      title: "Maranan's Farmville",
      route: '/booking-page',
      query: "Maranan's Farmville",
    },
  ]

  public searchForm: FormGroup = new FormGroup({
    searchValue: new FormControl('', Validators.required),
  });

  public currentPosition: any;
  constructor(
    private router: Router,
    private location: GeolocationService,
    private toast: ToastService,
    private loadingService: LoaderService
  ) {
    this.getCurrentLocation();
    setTimeout(() => {
      this.loadingService.hide();
    }, 300);
  }

  async onSearch(): Promise<any> {
    try {
      this.loadingService.show('Searching location...');
      const response = await this.location.searchLocation(
        `${this.searchForm.get('searchValue')?.value}`
      );
      console.log(response);
      const time: any = response.distanceFromCurrent / 60;
      const time2 =
        time.toString()[0] == 0
          ? `${
              this.decimalPipe
                .transform(time, '1.2-2')
                ?.toString()
                .split('.')[1]
            } minutes`
          : `${this.decimalPipe.transform(time, '1.2-2')} hours`;
      this.toast.presentToast(
        'bottom',
        `${this.decimalPipe.transform(
          response.distanceFromCurrent,
          '1.2-2'
        )} km from you for ${time2}`
      );
      this.loadingService.hide();

      return Promise.resolve(response);
    } catch (error) {
      this.loadingService.hide();
    }
  }

  onNavigate(route: string) {
    this.router.navigate([route]);
  }

  async test(): Promise<void> {
    console.log(';test');
  }

  navigatePage(route: any) {
    if (route == '/') {
      this.toast.presentToast('bottom', 'Coming soon');

      return;
    }
    this.router.navigate([route]);
  }

  async getCurrentLocation(): Promise<any> {
    try {
      const geoposition = await this.location.getGeolocation();
      const { display_name } = geoposition;

      this.currentPosition = Helper.extractAddress(display_name);
    } catch (error) {
      this.toast.presentToast('bottom', 'Cannot get location');
      this.loadingService.hide();

      console.error(error);
    }
  }

  extractAddress(address: string): string {
    const addressParts = address.split(', ');
    const relevantParts = addressParts.slice(1, 5); // Change the indices here to select the relevant parts of the address
    return relevantParts.join(', ');
  }
}
