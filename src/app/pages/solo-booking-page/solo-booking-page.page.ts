import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { GeolocationService } from 'src/app/services/geolocation.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { Helper } from 'src/app/helpers/helper';

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
  public pickUpCoords: any;

  public dropOff: string = '';
  public type: string = '';

  constructor(
    private geolocation: GeolocationService,
    private toast: ToastController,
    private loadingService: LoaderService
  ) {}

  ngOnInit() {}

  async setCurrentLocation(): Promise<any> {
    try {
      this.loadingService.show();
      const geoposition = await this.geolocation.getGeolocation();
      const { display_name, lat, lon } = geoposition;
      console.log(geoposition);
      this.pickUp = Helper.extractAddress(display_name);
      this.pickUpCoords = {
        lat: lat,
        long: lon,
      };
    } catch (error) {
      this.presentToast('bottom', 'Cannot get location');
      this.loadingService.hide();

      console.error(error);
    } finally {
      this.loadingService.hide();
    }
  }

  onClick() {
    const bookingObj = {
      pickUp: this.pickUp,
      pickUpCoords: this.pickUp,
      dropOff: this.dropOff,
      type: this.type,
    };
    console.log(bookingObj);
  }

  async presentToast(position: 'top' | 'middle' | 'bottom', message: any) {
    const toast = await this.toast.create({
      message: message,
      duration: 1500,
      position: position,
    });

    await toast.present();
  }
}