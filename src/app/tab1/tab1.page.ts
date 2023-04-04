import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { SliderPage } from '../components/slider/slider.page';
import { Geolocation } from '@ionic-native/geolocation/ngx';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [IonicModule,CommonModule,SliderPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers:[Geolocation]
  
})



export class Tab1Page {

  public buttons:any[]= [
    {
      title:'Solo',
      logo:'person-sharp',
      route:'/',
      action: this.test.bind(this)
    },
    {
      title:'Share',
      logo:'people-sharp',
      route:'/',
      action: this.test.bind(this)
    },
    {
      title:'Fare',
      logo:'pricetag-sharp',
      route:'/',
      action: this.test.bind(this)
    },
    {
      title:'Reminders',
      logo:'pricetag-sharp',
      route:'/',
      action: this.test.bind(this)
    },
    {
      title:'History',
      logo:'pricetag-sharp',
      route:'/',
      action: this.test.bind(this)
    },
  ]

  public popularDestinations:any[]=[
    {
      img:'assets/basilica.jpg',
      title:'Taal',
      route:'/booking-page'
    },
    {
      img:'assets/basilica.jpg',
      title:'Taal',
      route:'/booking-page'
    },
    {
      img:'assets/basilica.jpg',
      title:'Taal',
      route:'/booking-page'
    },
    {
      img:'assets/basilica.jpg',
      title:'Taal',
      route:'/booking-page'
    },
  ]
  public currentPosition:any
  constructor(private geo:Geolocation) {

    this.getCurrentLocation()
  }

  async test():Promise<void>{
    try {
      const geoposition = await this.geo.getCurrentPosition()

      const {longitude, latitude} = geoposition.coords
      const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`;
      const response = await fetch(url);
      const json = await response.json();
      console.log('Address: ', json.display_name);
      this.currentPosition = json
      console.log(longitude, latitude)
    } catch (error) {
      console.error(error)
      
    }
   
  }

  async getCurrentLocation():Promise<void>{
    try {
      const geoposition = await this.geo.getCurrentPosition()

      const {longitude, latitude} = geoposition.coords
      const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`;
      const response = await fetch(url);
      const json = await response.json();
      console.log('Address: ', json);
      this.currentPosition = json
      console.log(longitude, latitude)
    } catch (error) {
      console.error(error)
      
    }
  }
}
