import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {

  constructor(private http:HttpClient,private geo:Geolocation,) { }


  async getGeolocation( ):Promise<void>{

      try {
        const geoposition = await this.geo.getCurrentPosition()

        const {longitude, latitude} = geoposition.coords
        
        const response = await fetch(`${environment.geolocationLink}reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`);
        const json = await response.json();

        return json

      } catch (error) {
        console.error(error)
        
      }
  }
}
