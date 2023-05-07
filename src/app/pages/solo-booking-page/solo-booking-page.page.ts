import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { GeolocationService } from 'src/app/services/geolocation.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { Helper } from 'src/app/helpers/helper';
import { Router } from '@angular/router';
import { ToastService } from 'src/app/services/toast/toast.service';
import { IonicStorageService } from 'src/app/services/ionic-storage.service';

@Component({
  selector: 'app-solo-booking-page',
  templateUrl: './solo-booking-page.page.html',
  styleUrls: ['./solo-booking-page.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  providers: [Geolocation, GeolocationService],
})
export class SoloBookingPagePage implements OnInit {
  public pickUp: string = '';
  public pickUpCoordsLon: any;
  public pickUpCoordsLat: any;
  public dropOff: string = '';
  public type: string = '';

  constructor(
    private geolocation: GeolocationService,
    private toast: ToastService,
    private loadingService: LoaderService,
    private router: Router,
    private ionicStorageService: IonicStorageService
  ) {}

  ngOnInit() {}

  async setCurrentLocation(): Promise<any> {
    try {
      this.loadingService.show();
      const geoposition = await this.geolocation.getGeolocation();
      const { display_name, lat, lon } = geoposition;
      this.pickUp = Helper.extractAddress(display_name);
      this.pickUpCoordsLon = lon;
      this.pickUpCoordsLat = lat;
    } catch (error) {
      this.toast.presentToast('bottom', 'Cannot get location');
      this.loadingService.hide();

      console.error(error);
    } finally {
      this.loadingService.hide();
    }
  }

  async onClick() {
    if (!this.pickUp || !this.dropOff || !this.type) {
      this.toast.presentToast(
        'bottom',
        'Please fill all required booking details'
      );
      return;
    }
    try {
      const data = await this.ionicStorageService.getItem('user');

      const parsedData = JSON.parse(data);

      const bookingObj = {
        pickUp: this.pickUp,
        pickUpCoordsLon: this.pickUpCoordsLon,
        pickUpCoordsLat: this.pickUpCoordsLat,
        dropOff: this.dropOff,
        type: this.type,
        booker: parsedData?.user.uid,
        useType: 'booking',
      };

      this.router.navigate(['/solo-booking-confirmation'], {
        queryParams: bookingObj,
      });
      this.reset();
    } catch (error) {
      console.error(error);
    }
  }

  reset() {
    Object.assign(this, {
      pickUp: '',
      dropOff: '',
      type: '',
      pickUpCoordsLon: '',
      pickUpCoordsLat: '',
    });
  }
}
