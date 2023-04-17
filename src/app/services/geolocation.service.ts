import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { ToastController } from '@ionic/angular';
import { environment } from 'src/environments/environment';
import { IonicStorageService } from './ionic-storage.service';

@Injectable({
  providedIn: 'root',
})
export class GeolocationService {
  constructor(
    private http: HttpClient,
    private geo: Geolocation,
    private toast: ToastController,
    private ionicStorage: IonicStorageService
  ) {}

  public currentLocation: any;

  async getGeolocation(): Promise<any> {
    try {
      const geoposition = await this.geo.getCurrentPosition();

      this.currentLocation = geoposition.coords;
      this.ionicStorage.setItem(geoposition.coords, 'currentPosition');

      const { longitude, latitude } = geoposition.coords;

      const response = await fetch(
        `${environment.geolocationLink}/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`
      );
      const json = await response.json();

      return json;
    } catch (error) {
      this.presentToast('bottom', 'System error');

      console.error(error);
    }
  }

  async searchLocation(query: string): Promise<any> {
    try {
      const response = await fetch(
        `${environment.geolocationLink}/search?q=${
          query.toLowerCase() + ' ' + 'batangas'
        }&format=json`
      );
      const json = await response.json();

      const { lat, lon } = json[0];
      const distanceFromCurrent = await this.getDistanceFromLatLonInKm(
        lat,
        lon
      );

      return { ...json[0], distanceFromCurrent };
    } catch (error) {
      this.presentToast('bottom', 'Location not found in Batangas');
      console.error(error);
    }
  }

  async getDistanceFromLatLonInKm(lat2: number, lon2: number): Promise<number> {
    if (!this.currentLocation) {
      await this.getGeolocation();
    }
    const { longitude, latitude } = await this.currentLocation;

    const R = 6371;
    const dLat = this.deg2rad(lat2 - latitude);
    const dLon = this.deg2rad(lon2 - longitude);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(this.deg2rad(latitude)) *
        Math.cos(this.deg2rad(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const d = R * c;
    return d;
  }

  deg2rad(deg: number): number {
    return deg * (Math.PI / 180);
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
