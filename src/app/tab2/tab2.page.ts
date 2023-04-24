import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import * as L from 'leaflet';
import { GeolocationService } from '../services/geolocation.service';
import { FirebaseService } from '../services/firebase.service';
import { LoaderService } from '../services/loader/loader.service';
import { ToastService } from '../services/toast/toast.service';
import { IonicStorageService } from '../services/ionic-storage.service';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { Location } from '@angular/common';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: true,
  imports: [IonicModule, ReactiveFormsModule],
  providers: [Geolocation, GeolocationService, Location],
})
export class Tab2Page implements OnInit {
  public searchForm: FormGroup = new FormGroup({
    search: new FormControl('Taal', Validators.required),
  });
  private map: any;
  public getLocation: any;

  constructor(
    private router: Router,
    private geolocation: GeolocationService,
    private firebaseService: FirebaseService,
    private loaderService: LoaderService,
    private toast: ToastService,
    private location: Location
  ) {}

  async ngOnInit() {}

  async handleInput(loc: any) {
    console.log(loc.target.value.toLowerCase());
    try {
      const response = await this.geolocation.searchLocation(loc || 'taal');

      this.getLocation = response;
      this.initMap();
      return Promise.resolve(response);
    } catch (error) {
      this.toast.presentToast('bottom', 'Cannot get location, please retry');
      this.location.back();
      console.error(error);
    }
  }

  initMap(): void {
    try {
      this.map = L.map('map2').setView(
        [this.getLocation?.lat, this.getLocation?.lon],
        13
      );

      L.tileLayer(environment.mapLink, {
        maxZoom: 10,
      }).addTo(this.map);

      L.marker([this.getLocation?.lat, this.getLocation?.lon])
        .addTo(this.map)
        .bindPopup('Drop Off');
    } catch (error) {
      this.toast.presentToast('bottom', 'Cannot show map, please retry');
      console.error(error);
    }
  }
  async getDestinationLocationData(): Promise<any> {}
}
