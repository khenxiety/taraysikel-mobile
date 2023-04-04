import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { SliderPage } from '../components/slider/slider.page';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { GeolocationService } from '../services/geolocation.service';
import { Geolocation } from '@ionic-native/geolocation/ngx';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: true,
  imports: [IonicModule,CommonModule,SliderPage,ReactiveFormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers:[GeolocationService,Geolocation]
  
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
      logo:'notifications-sharp',
      route:'/',
      action: this.test.bind(this)
    },
    {
      title:'History',
      logo:'time-sharp',
      route:'/',
      action: this.test.bind(this)
    },
  ]

  public popularDestinations:any[]=[
    {
      img:'assets/basilica.jpg',
      title:'Basilica',
      route:'/booking-page'
    },
    {
      img:'assets/basilica.jpg',
      title:'Galleria',
      route:'/booking-page'
    },
    {
      img:'assets/basilica.jpg',
      title:'Municipal',
      route:'/booking-page'
    },
    {
      img:'assets/basilica.jpg',
      title:'Taal',
      route:'/booking-page'
    },
  ]

  public searchForm:FormGroup = new FormGroup({
    searchValue:new FormControl('')
  })


  public currentPosition:any
  constructor( private router:Router,private location:GeolocationService) {

    this.getCurrentLocation()

  }

  onSearch():void{
    console.log(this.searchForm.get('searchValue')?.value)

  }

  onNavigate(route:string){
    this.router.navigate([route])
  }

  async test():Promise<void>{
    console.log(';test')
   
  }

  async getCurrentLocation():Promise<void>{
    try {
      const geoposition = await this.location.getGeolocation()
      this.currentPosition = geoposition
    } catch (error) {
      console.error(error)
      
    }
  }
}
