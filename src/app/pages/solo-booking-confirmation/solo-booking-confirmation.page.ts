import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { GeolocationService } from 'src/app/services/geolocation.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Helper } from 'src/app/helpers/helper';

@Component({
  selector: 'app-solo-booking-confirmation',
  templateUrl: './solo-booking-confirmation.page.html',
  styleUrls: ['./solo-booking-confirmation.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  providers: [Geolocation, GeolocationService],
})
export class SoloBookingConfirmationPage implements OnInit {
  public bookingObj: any;
  public destination: any;
  public id: string = '';
  public getLocation: any;
  public time: string = '';
  public price: number = 0;

  constructor(
    private route: ActivatedRoute,
    private geolocation: GeolocationService
  ) {
    const myObject = this.route.snapshot.queryParams;
    this.bookingObj = myObject;
    console.log(myObject);
  }

  ngOnInit() {
    this.getDestinationLocationData();
  }

  async getDestinationLocationData(): Promise<any> {
    try {
      const currentLocation = await this.geolocation.getGeolocation();

      const response = await this.geolocation.searchLocation(
        this.bookingObj.dropOff
      );

      this.price = Math.round(response.distanceFromCurrent * 15);
      this.time = Helper.timeFormat(response.distanceFromCurrent);
      this.getLocation = response;
      console.log(Math.round(this.price), this.time, this.getLocation);
      return Promise.resolve(response);
    } catch (error) {}
  }

  locationFormat(location: string): any {
    const location1 = location.replace(location.split(',')[0] + ',' + ' ', '');
    const locationFormatted = location1.replace(
      location1.split(',')[0] + ',' + ' ',
      ''
    );
    return locationFormatted;
  }
}
