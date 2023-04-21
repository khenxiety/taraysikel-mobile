import { Component, OnInit } from '@angular/core';
import { CommonModule, DecimalPipe, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { GeolocationService } from 'src/app/services/geolocation.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Helper } from 'src/app/helpers/helper';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { ToastService } from 'src/app/services/toast/toast.service';

@Component({
  selector: 'app-booking-page',
  templateUrl: './booking-page.page.html',
  styleUrls: ['./booking-page.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  providers: [Geolocation, GeolocationService],
})
export class BookingPagePage implements OnInit {
  private decimalPipe = new DecimalPipe('en-US');

  private currentLoc: any;
  public popularDestinations: any[] = [
    {
      id: 1,
      img: 'assets/basilica.jpg',
      title: 'Taal Basilica',
      route: '/booking-page',
      query: 'Taal Basilica',
    },
    {
      id: 2,
      img: 'assets/destination-sample.png',
      title: 'Galleria Hotel',
      route: '/booking-page',
      query: 'Taal Galleria',
    },
    {
      id: 3,
      img: 'assets/basilica.jpg',
      title: 'Municipal Hall',
      route: '/booking-page',
      query: 'Taal municipal hall',
    },
    {
      id: 4,
      img: 'assets/taal-arch.jpg',
      title: 'Taal',
      route: '/booking-page',
      query: 'Taal Basilica',
    },
  ];

  public destination: any;
  public id: string = '';
  public getLocation: any;
  public time: string = '';
  public price: number = 0;

  constructor(
    private location: Location,
    private activatedRoute: ActivatedRoute,
    private geolocation: GeolocationService,
    private loaderService: LoaderService,
    private router: Router,
    private toast: ToastService
  ) {
    this.id = this.activatedRoute.snapshot.params['id'];
  }

  ngOnInit() {
    this.destination = this.popularDestinations.filter(
      (res) => this.id == res.id
    );
    this.getDestinationLocationData();
  }

  async getDestinationLocationData(): Promise<any> {
    try {
      const currentLocation = await this.geolocation.getGeolocation();

      this.currentLoc = currentLocation;
      const response = await this.geolocation.searchLocation(
        this.destination[0]?.query
      );

      this.price = response.distanceFromCurrent * 15;
      this.time = Helper.timeFormat(response.distanceFromCurrent);
      this.getLocation = response;
      return Promise.resolve(response);
    } catch (error) {
      this.toast.presentToast(
        'bottom',
        'Cannot get location, please try again'
      );
    }
  }

  onClick() {
    this.location.back();
  }

  locationFormat(location: string): any {
    const location1 = location.replace(location.split(',')[0] + ',' + ' ', '');
    const locationFormatted = location1.replace(
      location1.split(',')[0] + ',' + ' ',
      ''
    );
    return locationFormatted;
  }

  book() {
    const bookingObj = {
      pickUp: this.currentLoc?.display_name,
      pickUpCoordsLon: this.currentLoc.lon,
      pickUpCoordsLat: this.currentLoc.lat,
      dropOff: this.getLocation?.display_name,
      type: 'solo',
      booker: 'random id',
      useType: 'booking',
    };

    this.router.navigate(['/solo-booking-confirmation'], {
      queryParams: bookingObj,
    });
  }
}
