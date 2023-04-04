import { Component, OnInit } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-booking-page',
  templateUrl: './booking-page.page.html',
  styleUrls: ['./booking-page.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class BookingPagePage implements OnInit {

  constructor(private location:Location) { }

  ngOnInit() {
  }

  onClick(){

    this.location.back()

  }

}
