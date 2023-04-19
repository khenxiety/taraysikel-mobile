import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule, ToastController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';
import { GeolocationService } from 'src/app/services/geolocation.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Helper } from 'src/app/helpers/helper';
import { FirebaseService } from 'src/app/services/firebase.service';
import { LoaderService } from 'src/app/services/loader/loader.service';
import { MapComponent } from 'src/app/components/map/map.component';
import * as L from 'leaflet';
import { environment } from 'src/environments/environment';
import { ToastService } from 'src/app/services/toast/toast.service';
@Component({
  selector: 'app-solo-booking-confirmation',
  templateUrl: './solo-booking-confirmation.page.html',
  styleUrls: ['./solo-booking-confirmation.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [Geolocation, GeolocationService,MapComponent],
})
export class SoloBookingConfirmationPage implements OnInit, AfterViewInit  {
  private map: any;
  public bookingObj: any;
  public destination: any;
  public id: string = '';
  public getLocation: any;
  public time: string = '';
  public price: number = 0;
  @ViewChild('map') mapContainer: any;
  latitude = 51.505;
  longitude = -0.09;
  constructor(
    private route: ActivatedRoute,
    private router: Router,

    private geolocation: GeolocationService,
    private firebaseService:FirebaseService,
    private loaderService:LoaderService,
    private toast:ToastService,
    private location:Location
  ) {
    const myObject = this.route.snapshot.queryParams;
    this.bookingObj = myObject;
  }

  ngOnInit() {
    this.getDestinationLocationData();
  }
  ngAfterViewInit(): void {
    // this.initMap();
  }
  
  
  initMap(): void {

    try {

      const redIcon = new L.Icon({
        iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.4/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        tooltipAnchor: [16, -28],
        shadowSize: [41, 41]
      });
    
      this.map = L.map('map').setView([this.getLocation?.lat, this.getLocation?.lon], 13);
  
      L.tileLayer(environment.mapLink, {
        maxZoom: 10,
      }).addTo(this.map);
  
      const pickUpMarker = L.marker([this.getLocation?.lat, this.getLocation?.lon]).addTo(this.map).bindPopup('Drop Off');
      const dropOffMarker = L.marker([this.bookingObj?.pickUpCoordsLat, this.bookingObj?.pickUpCoordsLon]).addTo(this.map).bindPopup('Pick Up');
      dropOffMarker.setIcon(redIcon)

    } catch (error) {
      this.toast.presentToast('bottom', 'Cannot show map, please retry');
      console.error(error)
    }
    
    
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
      this.initMap();
      return Promise.resolve(response);
    } catch (error) {
      this.toast.presentToast('bottom', 'Cannot get location, please retry');
      this.location.back()
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
        driver:'', 
        type:this.bookingObj?.type
      }
      const addData = await this.firebaseService.addData(data,'booking')
      if(addData.status === 200){
        this.toast.presentToast('bottom', addData.message)
        this.router.navigate(['/booking-list'])
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
