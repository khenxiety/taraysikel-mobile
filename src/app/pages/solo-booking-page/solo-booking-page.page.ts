import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-solo-booking-page',
  templateUrl: './solo-booking-page.page.html',
  styleUrls: ['./solo-booking-page.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class SoloBookingPagePage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
