import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { GeolocationService } from 'src/app/services/geolocation.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Helper } from 'src/app/helpers/helper';
import { FirebaseService } from 'src/app/services/firebase.service';
import { LoaderService } from 'src/app/services/loader/loader.service';

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
    private router: Router,

    private geolocation: GeolocationService,
    private firebaseService:FirebaseService,
    private loaderService:LoaderService,
    private toast:ToastController
  ) {
    const myObject = this.route.snapshot.queryParams;
    this.bookingObj = myObject;
    console.log(myObject);
  }

  ngOnInit() {
    this.getDestinationLocationData();
  }

  async presentToast(position: 'top' | 'middle' | 'bottom', message: string) {
    const toast = await this.toast.create({
      message: message,
      duration: 1500,
      position: position,
    });

    await toast.present();
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
      return Promise.resolve(response);
    } catch (error) {
      this.presentToast('bottom', 'Cannot get location');
      console.error(error)
    }
  }

  locationFormat(location: string): any {
    const location1 = location?.replace(location.split(',')[0] + ',' + ' ', '');
    const locationFormatted = location1.replace(
      location1.split(',')[0] + ',' + ' ',
      ''
    );
    return locationFormatted;
  }

  async addBooking(){
    try {
      this.loaderService.show('Confirming booking')
      const data = {
        uid:'sampleUid',
        name:'samplename',
        pickup:this.bookingObj?.pickUp,
        pickUpCoords:{
          lon:this.bookingObj?.pickUpCoordsLon,
          lat:this.bookingObj?.pickUpCoordsLat,
  
        },
        dropOff:this.getLocation?.display_name,
        dropOffCoords:{
          lon:this.getLocation?.lon,
          lat:this.getLocation?.lat,
  
        },
        status:'pending',
        remarks:'sampleRemarks',
        date:new Date().toLocaleString(),
        pickUpTime:'samplePickTIme',
        dropOffTime:'sampleDropoffTIme',
        driver:''
      }
      const addData = await this.firebaseService.addData(data,'booking')
      if(addData.status === 200){
        this.presentToast('bottom', addData.message)
        this.router.navigate(['/tabs'])
      }
    } catch (error) {
      console.error(error)
      this.loaderService.hide()
      throw error
    }finally{
      this.loaderService.hide()
    }

  }

  
}
